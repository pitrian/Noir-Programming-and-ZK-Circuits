// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IVerifier {
    function verify(bytes calldata proof, bytes32[] calldata publicInputs) external view returns (bool);
}

contract Panagram is ERC1155, Ownable {
    bytes32 public s_answerDoubleHash; // Lưu bản băm Keccak256 lần 2
    uint256 public currentRound;
    address public verifierContract;
    
    mapping(uint256 => mapping(address => bool)) public hasGuessed;
    mapping(uint256 => bool) public isRoundSolved;

    uint256 public constant FIRST_WINNER_NFT = 0; // NFT ID 0 cho người đầu tiên
    uint256 public constant PARTICIPANT_NFT = 1;  // NFT ID 1 cho người đoán sau

    constructor(address _verifier) ERC1155("https://api.panagram.xyz/badges/{id}.json") Ownable(msg.sender) {
        verifierContract = _verifier;
    }

    // Chỉ Owner mới được bắt đầu vòng chơi mới và nạp bản băm đáp án lên mạng
    function newRound(bytes32 _answerDoubleHash) external onlyOwner {
        currentRound++;
        s_answerDoubleHash = _answerDoubleHash;
    }

    // Người chơi nạp Proof tạo từ Frontend lên đây để nhận thưởng NFT
    function makeGuess(bytes calldata _proof, bytes32[] calldata _publicInputs) external {
        require(!hasGuessed[currentRound][msg.sender], "Ban da doan dung trong vong nay roi!");
        
        // Kiểm tra chống Front-running: Ví người gọi hàm phải khớp với ví gài trong mạch ZK
        require(address(uint160(uint256(_publicInputs[1]))) == msg.sender, "Front-running attack detected!");

        // Gọi sang hợp đồng Verifier để xác thực tính đúng đắn toán học
        bool isValid = IVerifier(verifierContract).verify(_proof, _publicInputs);
        require(isValid, "Bang chung ZK khong hop le!");

        hasGuessed[currentRound][msg.sender] = true;

        if (!isRoundSolved[currentRound]) {
            // Đúc NFT ID 0 cho người đầu tiên giải được
            isRoundSolved[currentRound] = true;
            _mint(msg.sender, FIRST_WINNER_NFT, 1, "");
        } else {
            // Đúc NFT ID 1 cho những người đoán đúng tiếp theo
            _mint(msg.sender, PARTICIPANT_NFT, 1, "");
        }
    }
}