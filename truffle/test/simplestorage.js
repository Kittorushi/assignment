const SimpleStorage = artifacts.require("SimpleStorage");

contract('SimpleStorage', (account) => {

  it('should read newly written values', async() => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    console.log(account);
    var value = (await simpleStorageInstance.read.call()).toNumber();

    assert.equal(value, 0, "0 wasn't the initial value");

    await simpleStorageInstance.write(1);
    value = (await simpleStorageInstance.read.call()).toNumber();
    assert.equal(value, 1, "1 was not written");

    await simpleStorageInstance.write(2);
    value = (await simpleStorageInstance.read.call()).toNumber();

    assert.equal(value, 2, "2 was not written");


    const balance = await simpleStorageInstance.getBalance.call(account[0]);
    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });

  it('should send coin correctly', async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Setup 2 accounts.
    const accountOne = account[0];
    const accountTwo = account[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await simpleStorageInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await simpleStorageInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await simpleStorageInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await simpleStorageInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await simpleStorageInstance.getBalance.call(accountTwo)).toNumber();

    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });


  it('should send coin mutiple account correctly', async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Setup 2 accounts.
    const accountOne = account[0];
   
    
    for (let i = 1; i < 4; i++) {
    

    const accountOneStartingBalance = (await simpleStorageInstance.getBalance.call(account[0])).toNumber();
    const accountTwoStartingBalance = (await simpleStorageInstance.getBalance.call(account[i])).toNumber();

    // Make transaction from first account to anotherAccount.
    const amount = 10;
    await simpleStorageInstance.sendCoin(account[i], amount, { from: accountOne });

    const accountOneEndingBalance = (await simpleStorageInstance.getBalance.call(account[0])).toNumber();
    const accountTwoEndingBalance = (await simpleStorageInstance.getBalance.call(account[i])).toNumber();

    // Get balances of first and second account after the transactions.
    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");

    console.log(accountOneEndingBalance);
    console.log(accountTwoEndingBalance);

    }


  });


});
