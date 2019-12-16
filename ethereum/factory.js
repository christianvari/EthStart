import web3 from "./web3";
import campaignFactory from "./build/contracts/CampaignFactory.json";

const instance = new web3.eth.Contract(
    campaignFactory.abi,
    "0x14418847D74d342C5c345BeDfe59CCAb58E81c1B"
);

export default instance;
