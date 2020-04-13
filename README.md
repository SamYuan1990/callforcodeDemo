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

 