pragma solidity ^0.4.21;

contract CounterContract {

    address public owner;
    int64 count;

    constructor(int64 _count) public {
        owner = msg.sender;
        count = _count;
    }
    function increase() public {
        count++;
    }

    function increase(int64 amount) public {
        count += amount;
    }

    function getCount() public view returns( int64 ) {
        return count;
    }
    
    function setCount(int64 _count) public {
        count = _count;
    }
}