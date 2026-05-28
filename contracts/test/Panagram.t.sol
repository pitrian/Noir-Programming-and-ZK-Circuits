// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Panagram.sol";
import "../src/Verifier.sol";

contract PanagramIntegrationTest is Test {
    Panagram public game;
    UltraVerifier public verifier;

    address public owner = address(1);
    address public player = address(0x1234567890123456789012345678901234567890);

    bytes32 public mockAnswerDoubleHash = bytes32(uint256(1));

    function setUp() public {
        verifier = new UltraVerifier();

        vm.prank(owner);
        game = new Panagram(address(verifier));

        vm.prank(owner);
        game.newRound(mockAnswerDoubleHash);
    }

    function test_OwnerCanStartNewRound() public {
        assertEq(game.currentRound(), 1);
        assertEq(game.s_answerDoubleHash(), mockAnswerDoubleHash);
    }

    function test_PlayerCanSubmitCorrectProofAndMintNFT() public {
        bytes memory mockProof = abi.encodePacked("this_is_a_mock_proof_data");

        bytes32[] memory publicInputs = new bytes32[](2);
        publicInputs[0] = mockAnswerDoubleHash;
        publicInputs[1] = bytes32(uint256(uint160(player)));

        vm.prank(player);
        game.makeGuess(mockProof, publicInputs);

        assertTrue(game.hasGuessed(1, player));
        assertTrue(game.isRoundSolved(1));
        assertEq(game.balanceOf(player, 0), 1);
    }

    function test_Fail_NonOwnerCannotStartRound() public {
        vm.prank(player);
        vm.expectRevert();
        game.newRound(mockAnswerDoubleHash);
    }
}
