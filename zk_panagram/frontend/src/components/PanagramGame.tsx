import { useState } from "react";
import { ethers } from "ethers";
import { generateProof } from "../utils/generateProof";
import { useWriteContract, useAccount } from "wagmi";

const PANAGRAM_ABI = [
    {
        "inputs": [{ "internalType": "bytes", "name": "_proof", "type": "bytes" }],
        "name": "makeGuess",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;

const PANAGRAM_ADDRESS = "0xĐịa_Chỉ_Contract_Panagram_Của_Bạn";

export function PanagramGame({ currentRoundAnswerHash }: { currentRoundAnswerHash: string }) {
    const [guess, setGuess] = useState("");
    const { address } = useAccount();
    const { writeContract, isPending: isTxPending } = useWriteContract();
    const [isProving, setIsProving] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const FIELD_MODULUS = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617");

    const handlePlayGame = async () => {
        if (!address) {
            setStatusMessage("❌ Vui lòng kết nối ví Web3 ở góc trên trước!");
            return;
        }
        if (!guess) {
            setStatusMessage("⚠️ Ô trống kìa! Hãy nhập từ khóa mật mã bạn đoán.");
            return;
        }

        setIsProving(true);
        setStatusMessage("⚡ Đang băm dữ liệu và khởi tạo ZK Proof off-chain qua WASM...");

        try {
            const rawHash = ethers.keccak256(ethers.solidityPacked(["string"], [guess]));
            const guessHashBigInt = BigInt(rawHash) % FIELD_MODULUS;
            const guessHashStr = "0x" + guessHashBigInt.toString(16);

            const proof = await generateProof(guessHashStr, currentRoundAnswerHash, address);
            const hexProof = ethers.hexlify(proof) as `0x${string}`;

            setStatusMessage("✅ Thần kỳ chưa! ZK Proof đã tạo thành công off-chain mà không lộ từ gốc. Đang gọi ví ký giao dịch...");

            writeContract({
                address: PANAGRAM_ADDRESS,
                abi: PANAGRAM_ABI,
                functionName: "makeGuess",
                args: [hexProof],
            });

            setStatusMessage("🚀 Giao dịch đã cất cánh lên mạng lưới! Đang chờ Smart Contract mint NFT thưởng...");
        } catch (err) {
            console.error(err);
            setStatusMessage("❌ Quá trình thất bại. Từ đoán sai hoặc không khớp với bằng chứng toán học!");
        } finally {
            setIsProving(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#030014", color: "#e2e8f0", padding: "40px 20px", position: "relative", overflow: "hidden" }}>

            {/* NHÚNG CSS ANIMATION TRỰC TIẾP ĐỂ CHẠY HIỆU ỨNG ĐỘNG */}
            <style>{`
                @keyframes gradientBG {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes pulseGlow {
                    0% { box-shadow: 0 0 15px rgba(124, 58, 237, 0.4); }
                    50% { box-shadow: 0 0 30px rgba(56, 189, 248, 0.6); }
                    100% { box-shadow: 0 0 15px rgba(124, 58, 237, 0.4); }
                }
                .glow-card {
                    background: rgba(13, 11, 28, 0.7) !important;
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                    transition: all 0.3s ease;
                }
                .glow-card:hover {
                    border-color: #38bdf8 !important;
                    transform: translateY(-4px);
                    box-shadow: 0 12px 40px rgba(56, 189, 248, 0.25);
                }
                .btn-neon {
                    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                    background-size: 400% 400%;
                    animation: gradientBG 8s ease infinite;
                    transition: all 0.3s ease;
                }
                .btn-neon:hover {
                    transform: scale(1.02);
                    box-shadow: 0 0 25px #23a6d5;
                }
                .neon-text-glow {
                    text-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
                }
            `}</style>

            {/* ĐÈN BACKGROUND MỜ (ORB GLOW EFFECTS) */}
            <div style={{ position: "absolute", top: "-10%", left: "15%", width: "400px", height: "400px", background: "rgba(124, 58, 237, 0.15)", filter: "blur(120px)", borderRadius: "50%", pointerEvents: "none" }}></div>
            <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "450px", height: "450px", background: "rgba(56, 189, 248, 0.15)", filter: "blur(150px)", borderRadius: "50%", pointerEvents: "none" }}></div>

            <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

                {/* ====== HEADER BANNER GIÀU NĂNG LƯỢNG ====== */}
                <header style={{ textAlign: "center", marginBottom: "50px", padding: "50px 30px", background: "linear-gradient(180deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 27, 75, 0.4) 100%)", borderRadius: "30px", border: "1px solid rgba(124, 58, 237, 0.3)", animation: "pulseGlow 6s infinite" }}>
                    <span style={{ background: "linear-gradient(90deg, #00f2fe, #4facfe)", padding: "6px 18px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", letterSpacing: "1.5px", color: "#000", boxShadow: "0 0 15px #00f2fe" }}>
                        🔒 SECURE ZERO-KNOWLEDGE PROTOCOL
                    </span>
                    <h1 className="neon-text-glow" style={{ fontSize: "50px", fontWeight: "900", marginTop: "20px", marginBottom: "15px", background: "linear-gradient(to right, #00f2fe, #4facfe, #9b51e0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-1px" }}>
                        ZK-PANAGRAM EXPERIMENT
                    </h1>
                    <p style={{ fontSize: "16px", color: "#94a3b8", maxWidth: "650px", margin: "0 auto", lineHeight: "1.7" }}>
                        Đánh bại các Bot Front-running săn giải thưởng bằng công nghệ Không Tri Thức tiên tiến. Hãy gửi bằng chứng toán học <span style={{ color: "#00f2fe", fontWeight: "bold" }}>UltraHonk Proof</span> mã hóa từ máy của bạn thẳng lên mạng lưới on-chain!
                    </p>
                </header>

                {/* ====== GRID BAO GỒM HAI PHÂN KHU CHÍNH ====== */}
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "35px", alignItems: "start" }}>

                    {/* CỘT TRÁI: MODULE CHƠI VÀ THỰC THI MẠCH */}
                    <section className="glow-card" style={{ padding: "35px", borderRadius: "24px" }}>
                        <h2 style={{ fontSize: "22px", marginBottom: "25px", display: "flex", alignItems: "center", gap: "12px", color: "#00f2fe", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
                            <span>🔮</span> TRUNG TÂM GIẢI MÃ (PROVING HUB)
                        </h2>

                        <div style={{ marginBottom: "25px", background: "rgba(3, 7, 18, 0.8)", padding: "18px", borderRadius: "14px", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                            <label style={{ fontSize: "11px", color: "#38bdf8", fontWeight: "bold", display: "block", marginBottom: "8px", letterSpacing: "1px" }}>
                                LIVE ON-CHAIN STATE (ANSWER HASH):
                            </label>
                            <code style={{ fontSize: "13px", color: "#34d399", wordBreak: "break-all", fontFamily: "Fira Code, monospace" }}>
                                {currentRoundAnswerHash}
                            </code>
                        </div>

                        <div style={{ marginBottom: "30px" }}>
                            <label style={{ fontSize: "15px", color: "#cbd5e1", display: "block", marginBottom: "10px", fontWeight: "500" }}>
                                Nhập cụm từ suy luận được:
                            </label>
                            <input
                                type="text"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value)}
                                placeholder="Nhập đáp án bí mật của bạn tại đây..."
                                style={{ width: "95%", padding: "16px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "#050510", color: "#fff", fontSize: "16px", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)", outline: "none" }}
                                disabled={isProving || isTxPending}
                            />
                        </div>

                        <button
                            onClick={handlePlayGame}
                            className="btn-neon"
                            style={{ width: "100%", padding: "18px", color: "white", border: "none", borderRadius: "14px", cursor: "pointer", fontSize: "16px", fontWeight: "bold", letterSpacing: "0.5px" }}
                            disabled={isProving || isTxPending}
                        >
                            {isProving ? "⚙️ Đang ép xung WASM sinh ZK Proof..." : isTxPending ? "⏳ Đang đợi phê duyệt trên ví Web3..." : "🚀 Bắn Chứng Cứ Lên Smart Contract"}
                        </button>

                        {statusMessage && (
                            <div style={{ marginTop: "25px", padding: "15px 20px", borderRadius: "12px", backgroundColor: "rgba(15, 23, 42, 0.8)", borderLeft: "4px solid #38bdf8", fontSize: "14px", color: "#cbd5e1", lineHeight: "1.6" }}>
                                {statusMessage}
                            </div>
                        )}
                    </section>

                    {/* CỘT PHẢI: MARKETING & TECH STACKS */}
                    <section style={{ display: "flex", flexDirection: "column", gap: "25px" }}>

                        {/* HỘP CƠ CHẾ BẢO VỆ GIAO DỊCH */}
                        <div className="glow-card" style={{ padding: "26px", borderRadius: "20px" }}>
                            <h3 style={{ fontSize: "17px", color: "#a855f7", margin: "0 0 12px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                                🛡️ Chống Rình Rập Giao Dịch
                            </h3>
                            <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0", lineHeight: "1.6" }}>
                                Chuỗi đẩy lên blockchain là một chuỗi mã hóa ngẫu nhiên đại diện cho Proof toán học. Toàn bộ các con Bot săn tin trong Mempool sẽ hoàn toàn bất lực vì không có từ khóa gốc để sao chép Front-run giao dịch của bạn!
                            </p>
                        </div>

                        {/* HỘP QUY TRÌNH BA BƯỚC */}
                        <div className="glow-card" style={{ padding: "26px", borderRadius: "20px" }}>
                            <h3 style={{ fontSize: "17px", color: "#fbbf24", margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                                🎮 Các bước nhận NFT vinh danh
                            </h3>
                            <ul style={{ margin: "0", paddingLeft: "20px", fontSize: "14px", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "10px" }}>
                                <li>Kết nối ví Metamask mạng <b style={{ color: "#fff" }}>Sepolia Testnet</b>.</li>
                                <li>Điền đáp án đoán chữ chính xác vào ô Proving Hub.</li>
                                <li>Chạy sinh Proof off-chain mất <b style={{ color: "#34d399" }}>0 Gas</b> và ký duyệt để Smart Contract mint thưởng trực tiếp về ví.</li>
                            </ul>
                        </div>

                        {/* BANNER THỐNG SỐ ĐỎ ĐÈN NEON */}
                        <div className="glow-card" style={{ padding: "24px", borderRadius: "20px", display: "flex", justifyContent: "space-around", textAlign: "center", background: "rgba(9, 9, 20, 0.9) !important" }}>
                            <div>
                                <div style={{ fontSize: "24px", fontWeight: "900", color: "#00f2fe", textShadow: "0 0 8px #00f2fe" }}>100%</div>
                                <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", fontWeight: "bold" }}>Mật Mã Học</div>
                            </div>
                            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "15px" }}>
                                <div style={{ fontSize: "24px", fontWeight: "900", color: "#a855f7", textShadow: "0 0 8px #a855f7" }}>Noir</div>
                                <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", fontWeight: "bold" }}>ZK-Language</div>
                            </div>
                            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "15px" }}>
                                <div style={{ fontSize: "24px", fontWeight: "900", color: "#f43f5e", textShadow: "0 0 8px #f43f5e" }}>$0</div>
                                <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", fontWeight: "bold" }}>Phí Sinh Proof</div>
                            </div>
                        </div>

                    </section>
                </div>

                <footer style={{ textAlign: "center", marginTop: "60px", fontSize: "12px", color: "#475569", letterSpacing: "0.5px" }}>
                    Xây dựng vững chắc trên lõi Noir & Foundry Stack • Bảo mật dữ liệu kỷ nguyên Web3.
                </footer>
            </div>
        </div>
    );
}