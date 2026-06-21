# Noir Programming and ZK Circuits: A Practical Guide

Chào mừng bạn đến với kho lưu trữ (repository) lộ trình học tập và thực hành về **Noir** — một ngôn ngữ lập trình đặc dụng (Domain-Specific Language) giúp xây dựng các mạch (circuits) Zero-Knowledge Proof (ZKP) một cách an sau và hiệu quả.

Khóa học này tập trung vào tính thực tiễn, giúp phát triển kỹ năng lập trình ZK từ cơ bản đến nâng cao thông qua 4 dự án thực tế.

---

## 📑 Cấu trúc khóa học & Tiến độ dự án

Dưới đây là lộ trình 4 phần của khóa học và trạng thái thực hiện các dự án thực hành:

### 🟢 Section 1: Welcome To Noir
* **Mục tiêu:** Hiểu các khái niệm cơ bản về ZK (Witness, Constraints, Proof) và thiết lập môi trường phát triển.
* **Nội dung:** Cài đặt bộ công cụ Nargo, Barretenberg, `jq` và viết mạch "Hello World" đầu tiên.
* **[x] Project 1: Simple Circuit (Hoàn thành)**
  * Xây dựng một mạch Noir đơn giản để kiểm tra điều kiện $x \neq y$ (chứng minh biết bí mật $x$ khác số công khai $y$ mà không lộ $x$).
  * Làm quen với quy trình biên dịch, tạo dữ liệu đầu vào và kiểm thử mạch thông qua bộ công cụ `nargo test`.

### 🟡 Section 2: ZK ecrecover
* **Mục tiêu:** Làm chủ cú pháp Noir và các phép toán mật mã học cơ bản.
* **Nội dung:** Tìm hiểu sâu về kiểu dữ liệu (`Field` vs `Integer`), cách quản lý dependencies và viết hàm kiểm tra ràng buộc `assert`.
* **[ ] Project 2: ECDSA Verification Circuit (Chưa thực hiện)**
  * Xây dựng mạch xác thực chữ ký số ECDSA (`ecrecover`). Giúp người dùng chứng minh mình sở hữu một địa chỉ ví cụ thể mà không cần tiết lộ chữ ký số trực tiếp trên chuỗi.

### 🟡 Section 3: ZK Panagram App (Full-stack)
* **Mục tiêu:** Xây dựng một ứng dụng ZK hoàn chỉnh (Full-stack) kết hợp giữa Frontend và Smart Contract.
* **Nội dung:** Sử dụng `Noir.js` và `bb.js` để tạo bằng chứng ngay trên trình duyệt (client-side), đồng thời viết Smart Contract bằng Solidity kế thừa tiêu chuẩn ERC-1155 để trao thưởng NFT.
* **[ ] Project 3: Panagram Game (Chưa thực hiện)**
  * Trò chơi "Panagram" — người chơi chứng minh mình biết đáp án bí mật thông qua cơ chế băm hai lần (Double Hashing) để nhận thưởng NFT mà không để lộ đáp án trên blockchain.

### 🟡 Section 4: ZK Mixer (Capstone Project)
* **Mục tiêu:** Dự án cuối khóa nâng cao về quyền riêng tư và bảo mật giao dịch.
* **Nội dung:** Nghiên cứu và tìm hiểu cách thức hoạt động của các giao thức bảo mật nổi tiếng (như Tornado Cash).
* **[ ] Project 4: ETH Currency Mixer (Chưa thực hiện)**
  * Xây dựng một bộ trộn tiền tệ (Currency Mixer) trên Ethereum. Dự án giúp hiểu sâu về cách phá vỡ liên kết dòng tiền giữa người gửi và người nhận trên blockchain bằng ZK.

---

## 🛠 Bộ công cụ yêu cầu (Tech Stack)

Để chạy và phát triển các dự án trong repo này, hệ thống cần được cài đặt:

* **Nargo (v1.0.0-beta.21):** Trình quản lý gói và biên dịch Noir (Cài đặt thông qua `noirup`).
* **Barretenberg (v0.47.1):** Backend mã hóa tạo và xác minh bằng chứng (Cài đặt thông qua `bbup`).
* **jq & libc++1:** Thư viện hỗ trợ xử lý JSON và runtime C++ cho Barretenberg trên môi trường Linux/Ubuntu (WSL).
* **Foundry:** Môi trường phát triển, biên dịch và kiểm thử Smart Contract Solidity (Dùng cho Section 3 & 4).
* **Node.js:** Để tích hợp mạch ZK vào dApp thông qua JavaScript/TypeScript (Dùng cho Section 3).

---

## 👤 Tác giả (Author)

* **Họ và tên:** Ngô Minh Chung
* **Vai trò:** Blockchain Developer / Smart Contract Security Auditor Intern
* **Định hướng chuyên môn:** Tập trung nghiên cứu về bảo mật Blockchain, kiểm toán mã nguồn Smart Contract (Smart Contract Auditing) và ứng dụng mật mã học Zero-Knowledge Proofs (ZKP) vào các giao thức phi tập trung bảo mật quyền riêng tư.

---

## ⚠️ Lưu ý quan trọng (Disclaimer)

* **Noir hiện đang ở giai đoạn Beta:** Ngôn ngữ và bộ công cụ này đang phát triển rất nhanh, chưa được kiểm toán bảo mật (unaudited) và có thể thay đổi cấu trúc lệnh thường xuyên.
* **Mục đích giáo dục:** Toàn bộ mã nguồn trong kho lưu trữ này chỉ phục vụ cho việc học tập và nghiên cứu. Tuyệt đối không triển khai các hợp đồng xác minh (verifier) lên mạng chính (mainnet) để tránh rủi ro mất mát tài sản.

---

## 📚 Tài liệu tham khảo

* [Noir Documentation](https://noir-lang.org/) - Tài liệu kỹ thuật chính thức của ngôn ngữ Noir.
* [Cyfrin Updraft Course](https://updraft.cyfrin.io/) - Khóa học nền tảng về Web3 và bảo mật Smart Contract.
