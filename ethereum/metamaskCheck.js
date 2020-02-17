export default () => {
    if (!window.ethereum) {
        window.alert("You must install Metamask!");
        return false;
    }
    return true;
};
