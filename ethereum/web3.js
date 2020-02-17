import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    // We are in the browser and metamask is runnig
    web3 = new Web3(window.ethereum);
} else {
    // We are in the server or the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/95cc95a00a0d4909baec55736f369e46"
    );
    web3 = new Web3(provider);
}

export default web3;
