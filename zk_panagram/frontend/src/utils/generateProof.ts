import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend, Barretenberg } from "@aztec/bb.js";
// @ts-ignore
import circuit from "../zk_panagram.json"; // Chỉ cần lùi 1 cấp ra src/ là thấy ngay file

export async function generateProof(guessHash: string, answerHash: string, userAddress: string) {
    // 1. Khởi tạo thực thể Barretenberg WASM bắt buộc trên trình duyệt
    const api = await Barretenberg.new();

    // 2. Cấu hình Noir và Proving Backend nhận diện api
    const noir = new Noir(circuit as any);
    const backend = new UltraHonkBackend(circuit.bytecode, api);

    // 3. Khớp chính xác tên biến đầu vào định nghĩa trong file main.nr của bạn
    const inputs = {
        guess_hash: guessHash,
        answer_hash: answerHash,
        address: userAddress
    };

    try {
        // 4. Thực thi mạch Noir để sinh vết thực thi (Witness)
        const { witness } = await noir.execute(inputs);

        // 5. Tạo Proof thực tế (Keccak flag bắt buộc phải là true để khớp với UltraVerifier.sol)
        const { proof } = await backend.generateProof(witness, { keccak: true });

        // 6. Giải phóng bộ nhớ WebAssembly ngay sau khi xử lý xong
        await api.destroy();

        return proof;
    } catch (error) {
        await api.destroy();
        console.error("Lỗi quá trình tạo ZK Proof off-chain:", error);
        throw error;
    }
}