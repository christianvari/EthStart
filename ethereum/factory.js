import web3 from "./web3";
import campaignFactory from "./build/contracts/CampaignFactory.json";

const instance = new web3.eth.Contract(
    campaignFactory.abi,
    "0x147f4A49dc5cf1Ee813c5fa2EE0867f0fbB9A0dd"
);

export default instance;
