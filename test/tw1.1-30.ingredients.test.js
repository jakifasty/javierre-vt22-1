import { assert, expect, should } from 'chai';
const {sortIngredients}= require('../src/'+TEST_PREFIX+'utilities.js');

const ingredientsConst= [
    {aisle:"Produce", name:"pumpkin"},
    {aisle:"Frozen", name:"icecream"},
    {aisle:"Produce", name:"parsley"},
    {aisle:"Frozen", name:"frozen broccoli"},
];

describe("TW1.1 sortIngredients", function() {
    it("should sort by aisle first, then by name", function(){
        const ingredients= [...ingredientsConst];
        const sorted= sortIngredients(ingredients);
        
        return assert.equal(sorted.length, ingredients.length) 
            && assert.equal(sorted[0], ingredients[3]) 
            && assert.equal(sorted[1], ingredients[1])
            && assert.equal(sorted[2], ingredients[2])
            && assert.equal(sorted[3], ingredients[0]);
    });
    it("sorted array should not be the same object as original array. Use e.g. spread syntax [...array]", function(){
        const ingredients= [...ingredientsConst];
        const sorted= sortIngredients(ingredients);
        return assert.equal(sorted.length, ingredients.length)
            && assert.not.equal(sorted, ingredients);
    });
});
