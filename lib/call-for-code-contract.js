/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class CallForCodeContract extends Contract {

    async callForCodeExists(ctx, callForCodeId) {
        const buffer = await ctx.stub.getState(callForCodeId);
        return (!!buffer && buffer.length > 0);
    }

    async createCallForCode(ctx, callForCodeId, value) {
        const exists = await this.callForCodeExists(ctx, callForCodeId);
        if (exists) {
            throw new Error(`The call for code ${callForCodeId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(callForCodeId, buffer);
    }

    async readCallForCode(ctx, callForCodeId) {
        const exists = await this.callForCodeExists(ctx, callForCodeId);
        if (!exists) {
            throw new Error(`The call for code ${callForCodeId} does not exist`);
        }
        const buffer = await ctx.stub.getState(callForCodeId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateCallForCode(ctx, callForCodeId, newValue) {
        const exists = await this.callForCodeExists(ctx, callForCodeId);
        if (!exists) {
            throw new Error(`The call for code ${callForCodeId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(callForCodeId, buffer);
    }

    async deleteCallForCode(ctx, callForCodeId) {
        const exists = await this.callForCodeExists(ctx, callForCodeId);
        if (!exists) {
            throw new Error(`The call for code ${callForCodeId} does not exist`);
        }
        await ctx.stub.deleteState(callForCodeId);
    }

}

module.exports = CallForCodeContract;
