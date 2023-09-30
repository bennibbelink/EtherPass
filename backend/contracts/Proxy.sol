pragma solidity ^0.8.13;
import "./Registry.sol";

contract Proxy {
    mapping (address => address) private registries;

    constructor() {}

    function createRegistry() public {
        // create a new registry
        Registry newReg = new Registry(msg.sender);
        // store the address of the new registry
        registries[msg.sender] = address(newReg);
    }

    

    

    
}