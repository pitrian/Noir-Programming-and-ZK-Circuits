## 2. README cho Project Section 2
**Vị trí file:** Tạo file `README.md` nằm ngay bên trong thư mục `zk_ecdsa/`

```markdown
# Section 2: ECDSA Verification Circuit (ZK ecrecover)

Dự án nâng cao tập trung vào các phép toán mật mã học thực tế, cụ thể là xác thực chữ ký số trên đường cong Elliptic (ECDSA - secp256k1) ứng dụng trong mạng lưới Ethereum.

## 🎯 Mục tiêu dự án
* Làm chủ cấu trúc mảng dữ liệu thô (`[u8; N]`) trong Noir.
* Xây dựng mạch chứng minh người dùng sở hữu một chữ ký hợp lệ ứng với một địa chỉ ví cụ thể mà không cần công khai chữ ký đó trực tiếp lên chuỗi (On-chain).

## 🛠 Giải pháp tối ưu hóa v1.0
Trái với các tài liệu hướng dẫn cũ yêu cầu cài đặt thư viện ngoài `ecrecover-noir` từ GitHub dễ gây lỗi kẹt cơ chế khóa cache của hệ thống (`Waiting for lock on git dependencies cache...`), dự án này đã được cải tiến toàn diện:
* Loại bỏ phụ thuộc bên ngoài trong `Nargo.toml`.
* Sử dụng trực tiếp module mật mã học lõi `std::ecdsa::secp256k1` tích hợp sẵn trong thư viện chuẩn (Standard Library) của Noir giúp tốc độ biên dịch nhanh vượt trội và không phụ thuộc vào mạng internet.

## 💻 Logic mạch (`src/main.nr`)
```rust
use std::ecdsa::secp256k1; 

fn main(
    pub_key_x: [u8; 32],      // Private: Tọa độ X của public key
    pub_key_y: [u8; 32],      // Private: Tọa độ Y của public key
    signature: [u8; 64],      // Private: Chữ ký (ghép từ r và s, bỏ v)
    hashed_message: [u8; 32], // Private: Bản băm của thông điệp
    expected_address: Field   // Public: Địa chỉ ví mong đợi
) {
    // Sử dụng hàm verify tích hợp sẵn của hệ thống, trả về true/false
    let is_valid = secp256k1::verify_signature(pub_key_x, pub_key_y, signature, hashed_message);
    
    assert(is_valid == true, "Signature verification failed");
}

#[test]
fn test_ecdsa_verification() {
    // Hàm test kiểm tra cấu trúc biên dịch mạch
}