//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Kvstore {
    mapping(string => string) store;

    constructor() {}

    function get(string memory key) public view returns (string memory) {
        return store[key];
    }

    function set(string memory key, string memory value) public {
        store[key] = value;
    }
}
