// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {Panagram} from "../src/Panagram.sol";

// Tạo một MockVerifier siêu nhẹ thay thế cho UltraVerifier gốc khi chạy Test
contract MockVerifier {
    function verify(
        bytes calldata,
        bytes32[] calldata
    ) external pure returns (bool) {
        return true; // Luôn luôn trả về đúng để test logic NFT của Panagram
    }
}

contract PanagramTest is Test {
    Panagram public panagram;
    MockVerifier public verifier;

    uint256 constant FIELD_MODULUS =
        21888242871839275222246405745257275088548364400416034343698204186575808495617;
    bytes32 public ANSWER;
    address user = makeAddr("user");

    function setUp() public {
        verifier = new MockVerifier();
        panagram = new Panagram(address(verifier));

        ANSWER = bytes32(
            uint256(keccak256(abi.encodePacked("triangles"))) % FIELD_MODULUS
        );
        panagram.newRound(ANSWER);
    }

    function testCorrectGuessPasses() public {
        // Trong môi trường test thực tế, ta giả lập bằng chứng thành công
        bytes memory mockProof = abi.encodePacked("dummy_proof");

        vm.prank(user);
        bool success = panagram.makeGuess(mockProof);

        assertTrue(success);
        assertEq(panagram.balanceOf(user, 0), 1);
    }
}
