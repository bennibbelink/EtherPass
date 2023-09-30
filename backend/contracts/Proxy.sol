pragma solidity ^0.8.13;
import "./Registry.sol";

contract Proxy {
    mapping (address => address) private registries;

    constructor() {}

    function createRegistry() public {
        require(registries[msg.sender] == address(0), "Registry already exists");
        // create a new registry
        Registry newReg = new Registry(msg.sender);
        // store the address of the new registry
        registries[msg.sender] = address(newReg);
    }
    
    function getRegistryAddress() public view returns (address) {
        require(registries[msg.sender] != address(0), "Registry does not exist");
        // return the address of the registry
        return registries[msg.sender];
    }
    
}