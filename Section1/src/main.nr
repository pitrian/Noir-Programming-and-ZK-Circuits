fn main(x: Field, y: pub Field) {
    assert(x != y);
}

#[test]
fn test_circuit() {
    main(42, 100); // Thoa man dieu kien x != y
}