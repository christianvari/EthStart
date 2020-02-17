import web3 from "./web3";
import campaignFactory from "./build/contracts/CampaignFactory.json";

const instance = new web3.eth.Contract(
    campaignFactory.abi,
    "0xB515E4C2Afd216171E849110D79FCCbd7d5f6706"
);

export default instance;
