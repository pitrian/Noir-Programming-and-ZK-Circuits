// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {UltraVerifier} from "../src/Verifier.sol";

contract DeployVerifier is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // Chỉ deploy duy nhất Verifier
        UltraVerifier verifier = new UltraVerifier();
        console.log("-----------------------------------------");
        console.log("UltraVerifier deployed successfully at:");
        console.log(address(verifier));
        console.log("-----------------------------------------");

        vm.stopBroadcast();
    }
}
