fn main(guess_hash: Field, answer_hash: pub Field, address: pub Field) {
    // 1. Kiểm tra tính đúng đắn của từ đoán (so sánh hai bản băm)
    assert(guess_hash == answer_hash); 

   // 2. Ràng buộc địa chỉ ví người dùng (Public Input) vào tính toán của mạch.
    let addr_pow: Field = address * address;
    assert(addr_pow == address * address);
}