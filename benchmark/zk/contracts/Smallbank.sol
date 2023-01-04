//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Smallbank {
    //uint constant MAX_ACCOUNT = 10000;
    //uint constant BALANCE = 10000;
    //bytes20 constant accountTab = "account";
    //bytes20 constant savingTab = "saving";
    //bytes20 constant checkingTab = "checking";
    constructor() {}

    mapping(string => uint256) savingStore;
    mapping(string => uint256) checkingStore;

    function almagate(string memory arg0, string memory arg1) public {
        uint256 bal1 = savingStore[arg0];
        uint256 bal2 = checkingStore[arg1];

        checkingStore[arg0] = 0;
        savingStore[arg1] = bal1 + bal2;
    }

    function getBalance(string memory arg0)
        public
        view
        returns (uint256 balance)
    {
        uint256 bal1 = savingStore[arg0];
        uint256 bal2 = checkingStore[arg0];

        balance = bal1 + bal2;
        return balance;
    }

    function updateBalance(string memory arg0, uint256 arg1) public {
        uint256 bal1 = checkingStore[arg0];
        uint256 bal2 = arg1;

        checkingStore[arg0] = bal1 + bal2;
    }

    function updateSaving(string memory arg0, uint256 arg1) public {
        uint256 bal1 = savingStore[arg0];
        uint256 bal2 = arg1;

        savingStore[arg0] = bal1 + bal2;
    }

    function sendPayment(
        string memory arg0,
        string memory arg1,
        uint256 arg2
    ) public {
        uint256 bal1 = checkingStore[arg0];
        uint256 bal2 = checkingStore[arg1];
        uint256 amount = arg2;

        bal1 -= amount;
        bal2 += amount;

        checkingStore[arg0] = bal1;
        checkingStore[arg1] = bal2;
    }

    function writeCheck(string memory arg0, uint256 arg1) public {
        uint256 bal1 = checkingStore[arg0];
        uint256 bal2 = savingStore[arg0];
        uint256 amount = arg1;

        if (amount < bal1 + bal2) {
            checkingStore[arg0] = bal1 - amount - 1;
        } else {
            checkingStore[arg0] = bal1 - amount;
        }
    }
}
