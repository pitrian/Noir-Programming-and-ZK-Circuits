// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {Panagram} from "../src/Panagram.sol";

contract DeployPanagram is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Địa chỉ Verifier bạn nhận được từ Bước 1 (Thay địa chỉ thực tế của bạn vào đây)
        address verifiedContractAddress = 0x1234567890123456789012345678901234567890;

        vm.startBroadcast(deployerPrivateKey);

        // Deploy Panagram và gắn địa chỉ Verifier đã có sẵn vào
        Panagram panagram = new Panagram(verifiedContractAddress);
        console.log("-----------------------------------------");
        console.log("Panagram deployed successfully at:");
        console.log(address(panagram));
        console.log("-----------------------------------------");

        vm.stopBroadcast();
    }
}
