# This is call for code demo with IBP vs code plugin

## 1st `command+shift+p` create with code template with nodejs

## 2nd Start local fabric env via click the fabrci environments.

## 3rd Package and install the chain code
In this sample, we will not edit the code generate via plug-in
Using sample as it provides basic read/write feature sample for demo.
```
 await ctx.stub.putState(callForCodeId, buffer);
```
Open project callforcodedemo@0.0.1 instaniate.

## 4th as admin from Orderer Wallet

## 5th Invoke
Ref to test case
 ```
createCallForCode(ctx, '1003', 'call for code 1003 value');
 ```
submit transaction
 ```
["1003","call for code 1003 value"]
 ```

## 6th Query
Ref to test case
```
readCallForCode(ctx, '1003')
```
evaluate transaction
 ```
["1003"]
 ```

## tips for developer so far.
 npm test
 `./lib/call-for-code-contract.js`
 `./test/call-for-code-contract.js`

 ## For chain code upgrade.
 Update version in package json
 ```
  "version": "0.0.2",
 ```
add new function and change test coverage as we will skip test for this hello world function.
 ```
    async NewFunction(ctx) {
        return 'Here is new function';
    }

 ```

## Upgrade open project with function
 NewFunction
```docker ps -a ``` see function
```
[4/13/2020 7:34:49 PM] [SUCCESS] Returned value from NewFunction: Here is new function
```

## generateTest
Run function test as client to test the chaincode