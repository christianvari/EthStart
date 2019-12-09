const Campaign = artifacts.require("Campaign");
const Factory = artifacts.require("CampaignFactory");

let factory;
let campaign;

beforeEach(async () => {
    //Deploy every it
    factory = await Factory.new();

    await factory.createCampaign("100");

    let [campaignAddress] = await factory.getDeployedCampaigns();
    campaign = await Campaign.at(campaignAddress);
});

contract("Unit tests", accounts => {
    it("deploys a factory and a campaign", () => {
        assert.ok(factory.address);
        assert.ok(campaign.address);
    });

    it("marks caller as Campaign manager", async () => {
        const manager = await campaign.manager();
        assert.equal(manager, accounts[0]);
    });

    it("allows person to contribute and mark as contributor", async () => {
        await campaign.contribute({
            from: accounts[1],
            value: 200
        });

        const isContributor = campaign.approvers(accounts[1]);
        assert(isContributor);
    });

    it("requires a minimum contribute", async () => {
        try {
            await campaign.contribute({
                from: accounts[0],
                value: 50
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it("allows a manager to make a payment request", async () => {
        await campaign.createRequest("Buy batteries", 100, accounts[1], {
            from: accounts[0]
        });

        const request = await campaign.requests(0);

        assert.equal(accounts[1], request.recipient);
    });

    it("processes request", async () => {
        let balance_inital = await web3.eth.getBalance(accounts[1]);
        balance_inital = parseFloat(
            web3.utils.fromWei(balance_inital, "ether")
        );
        console.log("Initial balance " + balance_inital);

        await campaign.contribute({
            from: accounts[0],
            value: web3.utils.toWei("10", "ether")
        });

        await campaign.createRequest(
            "A",
            web3.utils.toWei("5", "ether"),
            accounts[1],
            {
                from: accounts[0]
            }
        );

        await campaign.approveRequest(0, { from: accounts[0] });
        await campaign.finalizeRequest(0, { from: accounts[0] });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = parseFloat(web3.utils.fromWei(balance, "ether"));

        console.log("Final balance " + balance);
        assert(balance > balance_inital);
    });
});
