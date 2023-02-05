//SPDX-License-Identifier: Unlicensed

pragma solidity >0.7.0 <=0.9.0;

// fundindRequest contract is used to create new funding request on web app
contract fundingRequest {
    address[] public deployedCampaign;

    event requestCreated(
        string title,
        uint256 requiredAmount,
        address indexed owner,
        address fundingAddress,
        string imgurl,
        uint256 indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory fundraiserTitle,
        uint256 fundraiserRequiredAmount,
        string memory fundraiserImgurl,
        string memory category,
        string memory fundraiserStoryurl
    ) public {
        Fundraiser newFundingRequest = new Fundraiser(
            fundraiserTitle,
            fundraiserRequiredAmount,
            fundraiserImgurl,
            fundraiserStoryurl,
            msg.sender
        );
        deployedCampaign.push(address(newFundingRequest));
        emit requestCreated(
            fundraiserTitle,
            fundraiserRequiredAmount,
            msg.sender,
            address(newFundingRequest),
            fundraiserImgurl,
            block.timestamp,
            category
        );
    }
}

contract Fundraiser {
    string public title;
    uint256 public requiredAmount;
    string public image;
    string public story;
    address payable public owner;
    uint256 public recievedAmount;

    //    event is used for filter of fundraising that will show in frond-end side
    event invested(
        address indexed investor,
        uint256 indexed amount,
        uint256 indexed timestamp
    );

    constructor(
        string memory fundraiserTitle,
        uint256 fundraiserRequiredAmount,
        string memory fundraiserImgurl,
        string memory fundraiserStoryurl,
        address campaignOwner
    ) {
        title = fundraiserTitle;
        requiredAmount = fundraiserRequiredAmount;
        image = fundraiserImgurl;
        story = fundraiserStoryurl;
        owner = payable(campaignOwner);
    }

    function invest() public payable {
        require(requiredAmount > recievedAmount, "Fulfilled");
        owner.transfer(msg.value);
        recievedAmount += msg.value;
        emit invested(msg.sender, msg.value, block.timestamp);
    }
}
