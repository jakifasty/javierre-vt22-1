import dishesConst from './dishesConst.js';
import { assert, expect, should } from 'chai';
const {menuPrice}= require('../src/'+TEST_PREFIX+'utilities.js');

describe("TW1.1 menuPrice", function() {
    this.timeout(200000);  // increase to allow debugging during the test run
    
    it("should sum up dish prices", function(){
        const dishes=[dishesConst[4], dishesConst[6], dishesConst[2], dishesConst[7]];

        return assert.equal(menuPrice(dishes),  dishesConst[4].pricePerServing
                            + dishesConst[6].pricePerServing
                            + dishesConst[2].pricePerServing
                            + dishesConst[7].pricePerServing
                           );
    });
});
