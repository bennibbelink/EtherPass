const truffleAssert = require('truffle-assertions');
const Proxy = artifacts.require("Proxy")
const Registry = artifacts.require('Registry')

contract('Proxy', (accounts) => {


    let registry;
    const accountOne = accounts[0];
    const accountTwo = accounts[1];
    const p1 = {
        id: 0,
        nickname: "1",
        password: "password",
        username: "user",
        domain: "something.com",
        tag: 0
    }
    const p2 = {
        id: 1,
        nickname: "2",
        password: "password",
        username: "user",
        domain: "something.com",
        tag: 0
    }
    const p3 = {
        id: 2,
        nickname: "3",
        password: "password",
        username: "user",
        domain: "something.com",
        tag: 0
    }

    beforeEach(async () => {
        // registry = await Registry.new(accountOne, { from: accountOne })
    });

    afterEach(async () => {
        // await proxy.deleteRegistry({ from: accountOne })
    });


    it('proxy_tests', async () => {
        const proxy = await Proxy.new({ from: accountOne })
        truffleAssert.reverts(proxy.getRegistryAddress({ from: accountOne }), null, 'registry doesnt exist')
        const regAddr = await proxy.createRegistry({ from: accountOne })
        truffleAssert.reverts(proxy.createRegistry({ from: accountOne }), null, 'cant make a second registries')
        const regAddr2 = await proxy.createRegistry({ from: accountTwo });
        if (regAddr == regAddr2) {
            assert.equal(true, false, "different users should have different registry addresses")
        }

        await proxy.deleteRegistry({ from: accountOne });
        truffleAssert.reverts(proxy.getRegistryAddress({ from: accountOne }), null, "registry does not exist since you deleted it")

        const regAddr3 = proxy.createRegistry({ from: accountOne });
        if (regAddr == regAddr3) {
            assert.equal(true, false, "should be a brand new contract, thus different addresses")
        }
    });

    it('just_add', async () => {
        registry = await Registry.new(accountOne, { from: accountOne })
        let passwords = await registry.getPasswords({ from: accountOne })
        assert.equal(passwords.length, 0, "password should be empty upon creation")

        await registry.batchUpdate([p1], [], [], { from: accountOne });
        passwords = await registry.getPasswords({ from: accountOne });
        assert.equal(passwords.length, 1, "one password has been added, length should be 1")

        await registry.batchUpdate([p2, p3], [], [], { from: accountOne });
        passwords = await registry.getPasswords({ from: accountOne });
        assert.equal(passwords.length, 3, "3 passwords have been added")
    })

    it("add_and_update", async () => {
        registry = await Registry.new(accountOne, { from: accountOne });
        truffleAssert.reverts(registry.batchUpdate([], [], [p1]), null, 'password doesnt exist to update')
        await registry.batchUpdate([p1], [], [], { from: accountOne });
        let passwords = await registry.getPasswords({ from: accountOne });
        assert.equal(passwords[0].nickname, '1', "password nickname should be 1");
        const newp1 = { ...passwords[0], nickname: 'newnickname' }
        await registry.batchUpdate([], [], [newp1], { from: accountOne });
        passwords = await registry.getPasswords({ from: accountOne });
        assert.equal(passwords.length, 1, 'still only one password');
        assert.equal(passwords[0].nickname, 'newnickname', 'nickname should have been updated')
    })

    it("add_and_delete", async () => {
        registry = await Registry.new(accountOne, { from: accountOne });
        await registry.batchUpdate([p1], [], []);
        await registry.batchUpdate([], [p1.id], [], { from: accountOne });
        let passwords = await registry.getPasswords({ from: accountOne });
        assert.equal(passwords.length, 0, 'there should be no passwords returned after the delete')

        await registry.batchUpdate([p1, p2, p3], [], [], { from: accountOne });
        passwords = await registry.getPasswords({ from: accountOne })
        await registry.batchUpdate([], [passwords[0].id], [], { from: accountOne });
        passwords = await registry.getPasswords({ from: accountOne })
        assert.equal(passwords.length, 2, "2 passwords should be returned after the delete")
        await registry.batchUpdate([], [passwords[0].id, passwords[1].id], [], { from: accountOne })
        passwords = await registry.getPasswords({ from: accountOne })
        assert.equal(passwords.length, 0, "0 passwords should be returned after the delete")
        await registry.batchUpdate([p1, p2, p3], [], [], { from: accountOne });
        passwords = await registry.getPasswords({ from: accountOne })
        assert.equal(passwords.length, 3, "3 passwords should be returned after the add")
    })
});
