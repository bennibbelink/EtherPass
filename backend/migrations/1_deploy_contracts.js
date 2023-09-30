const Proxy = artifacts.require("Proxy");
const Registry = artifacts.require("Registry");

module.exports = function(deployer) {
  // deployer.link(Registry, Proxy);
  deployer.deploy(Proxy);
};
