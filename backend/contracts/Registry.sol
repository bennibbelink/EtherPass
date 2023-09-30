pragma solidity ^0.8.13;

struct Password {
    uint id;
    string password;
    string username;
    string domain;
    uint16 tag;
}

contract Registry {

    // the address of the Proxy contract
    address private proxy;
    // the address of the user who created this registry
    address private owner;

    // maps the Password id to the Password struct
    mapping (uint => Password) public passwords;

    constructor(address _owner) {
        owner = _owner;
        proxy = msg.sender;
    }

    

    // selfdestruct is deprecated so we will refrain from using it
    // function selfDestructRegistry() public {
    //     require(msg.sender == owner);
    //     selfdestruct(payable(owner));
    // }

}