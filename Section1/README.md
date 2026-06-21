# Section 1: Simple ZK Circuit (Welcome To Noir)

Dự án đầu tiên trong lộ trình học tập Noir, tập trung vào việc làm quen với cú pháp cơ bản, thiết lập môi trường và hiểu quy trình thực thi mạch Zero-Knowledge Proof (ZKP).

## 🎯 Mục tiêu dự án
* Hiểu các khái niệm cốt lõi: Constraints (Ràng buộc), Witness (Vết thực thi), và Proof (Bằng chứng).
* Viết và kiểm thử một mạch logic đơn giản để chứng minh quyền sở hữu thông tin bí mật mà không làm lộ dữ liệu.

## 💻 Logic mạch (`src/main.nr`)
Mạch nhận vào hai giá trị: số bí mật `x` (private) và số công khai `y` (public). Nhiệm vụ của mạch là kiểm tra và ràng buộc điều kiện $x \neq y$.

```rust
fn main(x: Field, y: pub Field) {
    assert(x != y);
}

#[test]
fn test_circuit() {
    main(42, 100); // Thỏa mãn điều kiện x != y
}