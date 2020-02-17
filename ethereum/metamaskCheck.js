export default () => {
    if (!window.ethereum) {
        window.alert(
            "If you want to interact with this smart contract, you have to install metamask!"
        );
        return false;
    }
    return true;
};
