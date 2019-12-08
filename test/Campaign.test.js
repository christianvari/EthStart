const Campaign = artifacts.require("Campaign");
const Factory = artifacts.require("CampaignFactory");

let factory;
let campaign;

beforeEach(async () => {
    factory = await Factory.deployed();

    await factory.createCampaign("100");

    let [campaignAddress] = await factory.getDeployedCampaigns();
    campaign = await Campaign.at(campaignAddress);
});

contract("Campaigns", accounts => {
    it("deploys a factory and a campaign", async () => {
        assert.ok(factory.address);
        assert.ok(campaign.address);
    });
});
