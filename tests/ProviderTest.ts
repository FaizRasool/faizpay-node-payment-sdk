import { expect } from "chai";
import { ErrorHandler } from "../src/ErrorHandler";
import { Errors } from "../src/Errors";
import { Provider } from "../src/Provider";

describe("Provider test", () => { 

    it("Invalid 'sortCode' parameter for Provider.createProvider() should return CODE_7 error.", () => {

        const params = {
            providerId: "ob-lloyds",
            sortCode: "12345",
            accountNumber: "12345678"
        }

        const provider = Provider.createProvider(params.providerId, params.sortCode, params.accountNumber);

        expect(provider).to.be.instanceOf(ErrorHandler);

        if (provider instanceof ErrorHandler) {
            expect(provider.getCode()).to.be.eql(Errors.CODE_7[0]);
            expect(provider.getMessage()).to.be.eql(Errors.CODE_7[1]);
        }

    });

    it("Invalid 'accountNumber' parameter for Provider.createProvider() should return CODE_8 error.", () => {

        const params = {
            providerId: "ob-lloyds",
            sortCode: "123456",
            accountNumber: "1234567899"
        }

        const provider = Provider.createProvider(params.providerId, params.sortCode, params.accountNumber);

        expect(provider).to.be.instanceOf(ErrorHandler);

        if (provider instanceof ErrorHandler) {
            expect(provider.getCode()).to.be.eql(Errors.CODE_8[0]);
            expect(provider.getMessage()).to.be.eql(Errors.CODE_8[1]);
        }

    });

    it("Empty 'providerId' parameter for Provider.createProvider() should return CODE_9 error.", () => {

        const params = {
            providerId: "",
            sortCode: "123456",
            accountNumber: "12345678"
        }

        const provider = Provider.createProvider(params.providerId, params.sortCode, params.accountNumber);

        expect(provider).to.be.instanceOf(ErrorHandler);

        if (provider instanceof ErrorHandler) {
            expect(provider.getCode()).to.be.eql(Errors.CODE_9[0]);
            expect(provider.getMessage()).to.be.eql(Errors.CODE_9[1]);
        }

    });

    it(`Empty 'sortCode' or 'accountNumber' parameters for Provider.createProvider() 
    should return CODE_10 error.`, () => {

        const params1 = {
            providerId: "ob-lloyds",
            sortCode: "",
            accountNumber: "12345678"
        }

        const params2 = {
            providerId: "ob-lloyds",
            sortCode: "123456",
            accountNumber: ""
        }

        const provider1 = Provider.createProvider(params1.providerId, params1.sortCode, 
            params1.accountNumber);

        const provider2 = Provider.createProvider(params2.providerId, params2.sortCode, 
            params2.accountNumber);

        expect(provider1).to.be.instanceOf(ErrorHandler);
        expect(provider2).to.be.instanceOf(ErrorHandler);

        if (provider1 instanceof ErrorHandler) {
            expect(provider1.getCode()).to.be.eql(Errors.CODE_10[0]);
            expect(provider1.getMessage()).to.be.eql(Errors.CODE_10[1]);
        }

        if (provider2 instanceof ErrorHandler) {
            expect(provider2.getCode()).to.be.eql(Errors.CODE_10[0]);
            expect(provider2.getMessage()).to.be.eql(Errors.CODE_10[1]);
        } 

    });

    it(`Valid 'providerId' parameter alone for Provider.createProvider() should
    create new Provider.`, () => {

        const params = {
            providerId: "ob-lloyds"
        }

        const provider = Provider.createProvider(params.providerId);

        expect(provider).to.be.instanceOf(Provider);

        if (provider instanceof Provider) {
            expect(provider.getProviderId()).to.be.eql(params.providerId);
        }

    });

    it("Valid parameters for Provider.createProvider() should create new Provider.", () => {

        const params = {
            providerId: "ob-lloyds",
            sortCode: "123456",
            accountNumber: "12345678"
        }

        const provider = Provider.createProvider(params.providerId, params.sortCode, params.accountNumber);

        expect(provider).to.be.instanceOf(Provider);

        if (provider instanceof Provider) {
            expect(provider.getProviderId()).to.be.eql(params.providerId);
            expect(provider.getSortCode()).to.be.eql(params.sortCode);
            expect(provider.getAccountNumber()).to.be.eql(params.accountNumber);
        }

    });

    
})