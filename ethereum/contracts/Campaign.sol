pragma solidity ^0.5.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum, string memory title, string memory description) public {
        address newCampaign = address(new Campaign(minimum, msg.sender, title, description));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    string public title;
    string public description;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted(){
        require(msg.sender == manager, "You aren't the manger of this Campaign");
        _;
    }

    constructor(uint minimum, address creator, string memory t, string memory d) public {
        manager = creator;
        minimumContribution = minimum;
        title = t;
        description = d;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, "The minimum contribution is not satisfied");
        require(!approvers[msg.sender], "You can contribute only one time");

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory desc, uint value, address payable recipient) public restricted{
        Request memory newRequest = Request({
            description:desc,
            value:value,
            recipient:recipient,
            complete:false,
            approvalCount:0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint id) public {
        require(approvers[msg.sender], "You have to contribute");

        Request storage req = requests[id];

        require(! req.approvals[msg.sender], "You can approve only one time");

        req.approvals[msg.sender] = true;
        req.approvalCount++;
    }

    function finalizeRequest(uint id) public restricted{

        Request storage req = requests[id];

        require(! req.complete, "Request altredy completed");
        require(req.approvalCount > (approversCount / 2), "Not enough approvers");

        req.recipient.transfer(req.value);
        req.complete = true;

    }

    function getSummary() public view returns(uint, uint, uint, uint, address){
        return(
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
}