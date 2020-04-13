/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { CallForCodeContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('CallForCodeContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new CallForCodeContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"call for code 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"call for code 1002 value"}'));
    });

    describe('#callForCodeExists', () => {

        it('should return true for a call for code', async () => {
            await contract.callForCodeExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a call for code that does not exist', async () => {
            await contract.callForCodeExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createCallForCode', () => {

        it('should create a call for code', async () => {
            await contract.createCallForCode(ctx, '1003', 'call for code 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"call for code 1003 value"}'));
        });

        it('should throw an error for a call for code that already exists', async () => {
            await contract.createCallForCode(ctx, '1001', 'myvalue').should.be.rejectedWith(/The call for code 1001 already exists/);
        });

    });

    describe('#readCallForCode', () => {

        it('should return a call for code', async () => {
            await contract.readCallForCode(ctx, '1001').should.eventually.deep.equal({ value: 'call for code 1001 value' });
        });

        it('should throw an error for a call for code that does not exist', async () => {
            await contract.readCallForCode(ctx, '1003').should.be.rejectedWith(/The call for code 1003 does not exist/);
        });

    });

    describe('#updateCallForCode', () => {

        it('should update a call for code', async () => {
            await contract.updateCallForCode(ctx, '1001', 'call for code 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"call for code 1001 new value"}'));
        });

        it('should throw an error for a call for code that does not exist', async () => {
            await contract.updateCallForCode(ctx, '1003', 'call for code 1003 new value').should.be.rejectedWith(/The call for code 1003 does not exist/);
        });

    });

    describe('#deleteCallForCode', () => {

        it('should delete a call for code', async () => {
            await contract.deleteCallForCode(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a call for code that does not exist', async () => {
            await contract.deleteCallForCode(ctx, '1003').should.be.rejectedWith(/The call for code 1003 does not exist/);
        });

    });

});