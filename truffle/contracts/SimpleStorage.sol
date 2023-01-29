// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  uint256 value;
  
  mapping (address => uint) balances;

  constructor(){
    balances[tx.origin] = 10000;
  
  }

  function sendMoneyToContract() public payable{

  }

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }

  function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}


	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		return true;
	}

}
