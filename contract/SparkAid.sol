//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract SparkAid{

    using Counters for Counters.Counter;
    Counters.Counter private campaignIds;

    struct campaign{
        uint256 campaignId;
        address payable campaignOwner;
        uint256 requiredAmount;
        uint256 raisedAmount;
        string campaignURI;
        string category;
        uint256 timeCampaignCreated;
        uint256 timeCampaignEnds;
    }

    struct profile{
        address userAddress;
        string userName;
        string imgURI;
    }

    struct donator{
        address donatorAddress;
        string donatorName;
        string donatorCID;
        uint256 donatorAmount;
        bool donated;
    }

    campaign[] public listedCampaigns;

    mapping(uint256 => campaign) idToCampaign;
    mapping(address => profile) addressToProfile;
    mapping(address => donator) addressToDonator;
    mapping(address => bool) isProfileCreated;
    mapping(address => campaign[]) addressToCampaigns;
    mapping(uint256 => donator[]) idToDonators;

    function createProfile(string memory _userName, string memory _imgURI) public{
        profile memory newProfile = profile(msg.sender, _userName, _imgURI);
        addressToProfile[msg.sender] = newProfile;
        isProfileCreated[msg.sender] = true;
    }

    function getIsProfileCreated() public view returns(bool){
        return isProfileCreated[msg.sender];
    }

    function getProfileUserName(address _add) public view returns(string memory){
        return addressToProfile[_add].userName;
    }

    function getCampaign(uint256 _id) public view returns(campaign memory){
        return idToCampaign[_id];
    }

    function getProfileCID(address _add) public view returns(string memory){
        return addressToProfile[_add].imgURI;
    }

    function getCampaignURI(uint256 _id) public view returns(string memory){
        return idToCampaign[_id].campaignURI;
    }

    function getDonators(uint256 _id) public view returns(donator[] memory){
        return idToDonators[_id];
    }

    function getRaisedAmount(uint256 _id) public view returns(uint256){
        return idToCampaign[_id].raisedAmount;
    }

    function createCampaign(uint256 _requiredAmount, string memory _campaignURI, string memory _category, uint256 _timeCampaignEnds) public {
        require(isProfileCreated[msg.sender] == true, "Please create your profile first.");
        campaignIds.increment();
        uint256 newCampaignId = campaignIds.current();
        campaign memory newcampaign = campaign(newCampaignId, payable(msg.sender), _requiredAmount, 0, _campaignURI, _category, block.timestamp, _timeCampaignEnds);
        listedCampaigns.push(newcampaign);
        addressToCampaigns[msg.sender].push(newcampaign);
        idToCampaign[newCampaignId] = newcampaign;
    }

    function donateInCampaign(uint256 _campaignId) public payable{
        require(isProfileCreated[msg.sender] == true, "Please create your profile first");
        require(msg.value > 0, "Amount must be greater than 0");
        require(msg.value <= (idToCampaign[_campaignId].requiredAmount - idToCampaign[_campaignId].raisedAmount), "Send the correct amount");
        (idToCampaign[_campaignId].campaignOwner).transfer(msg.value);
        idToCampaign[_campaignId].raisedAmount += msg.value;
        donator memory newDonator = donator(addressToProfile[msg.sender].userAddress, addressToProfile[msg.sender].userName, addressToProfile[msg.sender].imgURI, msg.value, true);
        idToDonators[_campaignId].push(newDonator);
    }

    function getRemainingTime(uint _campaignId) public view returns(uint256){
        return (idToCampaign[_campaignId].timeCampaignEnds - block.timestamp);
    }

    function getRemainingAmount(uint256 _campaignId) public view returns(uint256){
        return(idToCampaign[_campaignId].requiredAmount - idToCampaign[_campaignId].raisedAmount);
    }

    function getListedCampaigns() public view returns(campaign[] memory){
        return listedCampaigns;
    }

    function getMyCampaigns() public view returns(campaign[] memory){
        return addressToCampaigns[msg.sender];
    }
}