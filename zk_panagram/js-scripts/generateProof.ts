import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend, Barretenberg } from "@aztec/bb.js"; // 1. Thêm import Barretenberg ở đây
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

async function generateProof() {
    // 1. Lấy đường dẫn tuyệt đối đến tệp bytecode của mạch Noir
    const circuitPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../zk_panagram/target/zk_panagram.json");
    const circuitData = JSON.parse(fs.readFileSync(circuitPath, "utf8"));

    // 2. Lấy các đối số từ dòng lệnh truyền từ FFI sang
    const inputsArray = process.argv.slice(2);

    // 3. Khởi tạo đối tượng api (Barretenberg) trước
    const api = await Barretenberg.new(); // 2. Khởi tạo api dạng async

    // 4. Khởi tạo Noir và Backend truyền đủ 2 tham số
    const noir = new Noir(circuitData);
    const backend = new UltraHonkBackend(circuitData.bytecode, api); // 3. Truyền api vào tham số thứ 2

    // Ràng buộc chính xác các chỉ số mảng đầu vào liên tục
    const inputs = {
        guess_hash: inputsArray[0],
        answer_hash: inputsArray[1],
        address: inputsArray[2]
    };

    // 5. Tạo Witness và Proof
    const { witness } = await noir.execute(inputs);

    // Tạm thời tắt log hệ thống để tránh làm hỏng dữ liệu Bytecode trả về cho Foundry FFI
    const originalLog = console.log;
    console.log = () => { };
    const { proof } = await backend.generateProof(witness, { keccak: true });
    console.log = originalLog;

    // Giải phóng bộ nhớ của api sau khi dùng xong
    await api.destroy();

    // 6. Mã hóa bằng chứng theo chuẩn ABI để Solidity có thể giải mã đọc được
    return ethers.AbiCoder.defaultAbiCoder().encode(["bytes"], [proof]);
}

generateProof()
    .then(p => process.stdout.write(p))
    .catch(() => process.exit(1));