// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.0;
// deployed to 0xe1e99a0Ee4b154244e6053B075465820239Dd691
contract BuyMeACoffee {
    // events
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string memo
    );

    //  defining schemas
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string memo;
    }

    // defintions
    address payable owner;
    Memo[] memo;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory name, string memory message)
        public
        payable
    {
        // this is the test case
        require(msg.value >= 0, "Price should be greater than 0");

        //adding to the memo list
        memo.push(Memo(msg.sender, block.timestamp, name, message));

        //event
        emit NewMemo(msg.sender, block.timestamp, name, message);
    }

    // withdraw funds from contract to owner
    function withdrawTips() public {
        require(owner.send(address(this).balance));

    }

    // get all memos
    function allMemos() view public returns(Memo[] memory) {
        return memo;
    }
}
