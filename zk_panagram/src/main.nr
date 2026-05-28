use std::hash::pedersen_hash;

fn main(guess_hash: [u8; 32], answer_double_hash: pub [u8; 32], user_address: pub Field) {
    let mut input_fields = [0; 32];
    for i in 0..32 {
        input_fields[i] = guess_hash[i] as Field;
    }
    let guess_double_hash = pedersen_hash(input_fields);

    let mut answer_fields = [0; 32];
    for i in 0..32 {
        answer_fields[i] = answer_double_hash[i] as Field;
    }
    let target_double_hash = pedersen_hash(answer_fields);

    assert(guess_double_hash == target_double_hash);
    assert(user_address != 0);
}

#[test]
fn test_panagram_solidity_flow() {
    let mock_guess_hash: [u8; 32] = [1; 32];
    let mock_answer_double_hash: [u8; 32] = [1; 32];
    let mock_wallet = 1;

    main(mock_guess_hash, mock_answer_double_hash, mock_wallet);
}
