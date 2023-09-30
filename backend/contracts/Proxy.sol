pragma solidity ^0.8.13;
import "./Registry.sol";
import "truffle/console.sol";

contract Proxy {
    event Creation(address _from, address _registry);
    mapping(address => address) private registries;

    constructor() {}

    function createRegistry() public returns (address) {
        require(
            registries[msg.sender] == address(0),
            "Registry already exists"
        );
        // create a new registry
        Registry newReg = new Registry(msg.sender);

        console.log(address(newReg));

        // store the address of the new registry
        registries[msg.sender] = address(newReg);
        console.log(registries[msg.sender]);
        emit Creation(msg.sender, address(newReg));
        return address(newReg);
    }

    function getRegistryAddress() public view returns (bytes memory) {
        require(
            registries[msg.sender] != address(0),
            "Registry does not exist"
        );
        // return the address of the registry
        return toBytes(registries[msg.sender]);
    }

    function deleteRegistry() public {
        require(
            registries[msg.sender] != address(0),
            "Registry does not exist"
        );
        // delete the registry
        delete registries[msg.sender];
    }

    function toString(address _addr) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = "0";
        str[1] = "x";

        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }

        return string(str);
    }

    function toBytes(address a) public pure returns (bytes memory) {
        return abi.encodePacked(a);
    }
}
