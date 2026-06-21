import { PanagramGame } from "./components/PanagramGame";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Khởi tạo cấu hình kết nối ví cơ bản qua Wagmi
const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {
  // Giả định mã băm của đáp án vòng hiện tại (Thay bằng mã băm thực tế lấy từ On-chain)
  const sampleAnswerHash = "0x0ebf6d1bc502f10b74bb2ffb6238bdfdf37c7676767676767676767676767676";

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", backgroundColor: "#fafafa", padding: "20px" }}>
          <PanagramGame currentRoundAnswerHash={sampleAnswerHash} />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;