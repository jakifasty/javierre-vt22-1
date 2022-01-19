import dishesConst from './dishesConst.js';
import { assert, expect, should } from 'chai';
const {sortDishes}= require('../src/'+TEST_PREFIX+'utilities.js');

describe("TW1.1 sortDishes", function() {
    this.timeout(200000);  // increase to allow debugging during the test run
    
    it("sort order should be: 'no type', starter, main course, dessert", function(){
        const sorted= sortDishes(
            [dishesConst[4], dishesConst[6], dishesConst[2], dishesConst[7]]
        );
        assert.equal(sorted.length, 4);
        assert.equal(sorted[0], dishesConst[7]);
        assert.equal(sorted[1], dishesConst[2]);
        assert.equal(sorted[2], dishesConst[4]);
        assert.equal(sorted[3], dishesConst[6]);
    });
    it("sorted array should not be the same object as original array. Use e.g. spread syntax [...array]", function(){
        const array= [dishesConst[4], dishesConst[6], dishesConst[2], dishesConst[7]];
        const sorted= sortDishes(array);
        assert.equal(sorted.length, 4);
        expect(sorted).to.not.equal(array);
    });
});
