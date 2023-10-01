pragma solidity ^0.8.13;

struct Password {
    uint id;
    string nickname;
    string password;
    string username;
    string domain;
    uint16 tag;
}

contract Registry {

    // the current next id for a Password
    uint currId = 1;

    // the number of passwords in the registry
    uint numPasswords = 0;

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

    function getPasswords() public view returns (Password[] memory) {
        require(msg.sender == owner, "Only the owner can get passwords");
        Password[] memory _passwords = new Password[](numPasswords);
        // iterate through all the passwords up to currId
        for (uint i = 1; i < currId; i++) {
            if (!isPasswordEmpty(i)) {
                _passwords[i] = passwords[i];
            }
        }
        return _passwords;
    }

    function batchUpdate(Password[] memory adds, uint[] memory deletes, Password[] memory updates) public {
        require(msg.sender == owner, "Only the owner can batch update");
        for (uint i = 0; i < adds.length; i++) {
            addPassword(adds[i].nickname, adds[i].password, adds[i].username, adds[i].domain, adds[i].tag);
        }
        for (uint i = 0; i < deletes.length; i++) {
            deletePassword(deletes[i]);
        }
        for (uint i = 0; i < updates.length; i++) {
            updatePassword(updates[i].id, updates[i].nickname, updates[i].password, updates[i].username, updates[i].domain, updates[i].tag);
        }
    }

    function addPassword(string memory _nickname, string memory _password, string memory _username, string memory _domain, uint16 _tag) private {
        // only the owner of the registry can add a password
        require(msg.sender == owner, "Only the owner can add a password");
        // create a new Password struct
        Password memory p = Password(currId, _nickname, _password, _username, _domain, _tag);
        // add the password to the registry
        passwords[currId] = p;
        // increment the current id
        currId++;
        // increment the number of passwords
        numPasswords++;
    }

    function updatePassword(uint id, string memory _nickname, string memory _password, string memory _username, string memory _domain, uint16 _tag) private {
        // only the owner of the registry can update a password
        require(msg.sender == owner, "Only the owner can update a password");
        // make sure the password exists
        require(!isPasswordEmpty(id), "Password does not exist");
        // update the password
        passwords[id].nickname = _nickname;
        passwords[id].password = _password;
        passwords[id].username = _username;
        passwords[id].domain = _domain;
        passwords[id].tag = _tag;
    }

    function deletePassword(uint id) private {
        // only the owner of the registry can delete a password
        require(msg.sender == owner, "Only the owner can delete a password");
        // make sure the password exists
        require(!isPasswordEmpty(id), "Password does not exist");
        // delete the password
        delete passwords[id];
        // decrement the number of passwords
        numPasswords--;
    }

    function isPasswordEmpty(uint id) private view returns (bool) {
        Password memory p = passwords[id];
        return p.id == 0 && 
            keccak256(bytes(p.nickname)) == keccak256(bytes("")) &&
            keccak256(bytes(p.password)) == keccak256(bytes("")) && 
            keccak256(bytes(p.username)) == keccak256(bytes("")) && 
            keccak256(bytes(p.domain)) == keccak256(bytes(""))  && 
            p.tag == 0;
    }

}