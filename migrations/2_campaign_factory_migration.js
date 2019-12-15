const factory = artifacts.require("CampaignFactory");
const fs = require("fs");
const path = require("path");

module.exports = async function(deployer) {
    await deployer.deploy(factory);

    fs.writeFileSync(
        path.resolve(__dirname, "..", "build", "campaing_address"),
        factory.address
    );
};
