// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
// Thường bb sẽ tạo contract tên là UltraVerifier bên trong Verifier.sol
import {UltraVerifier} from "../src/Verifier.sol";

contract DeployVerifier is Script {
    function run() external {
        // Lấy Private Key từ biến môi trường của bạn
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // Khởi tạo và deploy UltraVerifier
        UltraVerifier verifier = new UltraVerifier();

        vm.stopBroadcast();
    }
}
