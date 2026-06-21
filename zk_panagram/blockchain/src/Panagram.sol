// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// Interface để gọi hợp đồng Verifier đã tạo từ Noir
interface IVerifier {
    function verify(
        bytes calldata proof,
        bytes32[] calldata publicInputs
    ) external view returns (bool);
}

contract Panagram is ERC1155, Ownable {
    IVerifier public s_verifier;
    bytes32 public s_answer; // Bản băm đáp án vòng hiện tại
    uint256 public s_currentRound;
    address public s_currentRoundWinner;

    // Hằng số thời gian tối thiểu giữa các vòng (ví dụ: 3 giờ)
    uint256 public constant MIN_DURATION = 10800;
    uint256 public s_roundStartTime;

    error Panagram_InvalidProof();
    error Panagram_NoRoundWinner();

    constructor(
        address _verifier
    )
        ERC1155(
            "ipfs://bafybeicqfc4ipkle34tgqv3gh7gccwhmr22qdg7p6k6oxon255mnwb6csi/{id}.json"
        )
        Ownable(msg.sender)
    {
        s_verifier = IVerifier(_verifier);
    }

    // Chỉ Owner mới có thể bắt đầu vòng chơi mới
    function newRound(bytes32 _answer) external onlyOwner {
        if (s_currentRound != 0 && s_currentRoundWinner == address(0)) {
            revert Panagram_NoRoundWinner();
        }
        s_answer = _answer;
        s_currentRound++;
        s_currentRoundWinner = address(0);
        s_roundStartTime = block.timestamp;
    }

    // Hàm để người chơi nộp bằng chứng ZK
    function makeGuess(bytes memory _proof) external returns (bool) {
        // Khởi tạo mảng động gồm 2 phần tử bộ nhớ tạm thời
        bytes32[] memory publicInputs = new bytes32[](2);

        // Gán giá trị vào từng index cố định trong mảng
        publicInputs[0] = s_answer; // Phần tử thứ nhất: answer_hash
        publicInputs[1] = bytes32(uint256(uint160(msg.sender))); // Phần tử thứ hai: địa chỉ người chơi

        // Gọi Verifier để xác minh bằng chứng
        bool proofResult = s_verifier.verify(_proof, publicInputs);
        if (!proofResult) revert Panagram_InvalidProof();

        // Nếu đúng, trao thưởng NFT
        if (s_currentRoundWinner == address(0)) {
            s_currentRoundWinner = msg.sender;
            _mint(msg.sender, 0, 1, ""); // ID 0 cho người thắng đầu tiên
        } else {
            _mint(msg.sender, 1, 1, ""); // ID 1 cho những người sau
        }
        return true;
    }

    // Cho phép Owner cập nhật địa chỉ Verifier nếu mạch Noir thay đổi
    function setVerifier(address _newVerifier) external onlyOwner {
        s_verifier = IVerifier(_newVerifier);
    }
}
