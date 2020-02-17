import web3 from "./web3";
import campaignFactory from "./build/contracts/CampaignFactory.json";

const instance = new web3.eth.Contract(
    campaignFactory.abi,
    "0x03d25df944F0B5167F81324247E870f2530565C1"
);

export default instance;
