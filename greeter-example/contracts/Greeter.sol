//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Greeter {
    struct MyStruct {
        string name;
    }

    MyStruct private greeting;

    int256 num;
    string secondStr;

    constructor(
        MyStruct[] memory myStr,
        int256[] memory myArgNum,
        string memory mySecondStr
    ) {
        greeting = myStr[1];
        num = myArgNum[0];
        secondStr = mySecondStr;
    }

    function greet() public view returns (string memory) {
        return greeting.name;
    }

    function greetNum() public view returns (int256) {
        return num;
    }

    function greetSecond() public view returns (string memory) {
        return secondStr;
    }
}
