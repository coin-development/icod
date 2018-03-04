const MultiSigWallet = artifacts.require('multisig-wallet/MultiSigWallet.sol');

const SafeMath = artifacts.require("./math/SafeMath.sol");
const Ownable  = artifacts.require("./traits/Ownable.sol");

const config = require("../config");
const fs     = require("fs");

module.exports = function test(deployer) {
    deployer.deploy(MultiSigWallet,
    config.get("wallet:owners"),
    config.get("wallet:required"))
    .then(() => {
        return deployer.deploy([SafeMath, Ownable]);
    })
    .then((txs) => {
        fs.writeFileSync('contracts.txt', `LIST OF CONTRACTS
${"-".repeat(30)}
MultiSig:      ${MultiSigWallet.address}
SafeMath:      ${SafeMath.address}
        `);
    })
    .catch((err) => {
        console.error("Deployment failed", err);
    })
};