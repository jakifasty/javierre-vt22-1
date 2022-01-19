import { assert, expect, should } from 'chai';
const {shoppingList}= require('../src/'+TEST_PREFIX+'utilities.js');

const dishes= [
    {
        extendedIngredients:[
            {aisle:"Produce", name:"pumpkin", id:12, amount: 3.5},
            {aisle:"Frozen", name:"frozen broccoli", id:14, amount:10},
        ]},
    {
        extendedIngredients:[
            {aisle:"Produce", name:"pumpkin", id:12, amount: 10},
            {aisle:"Produce", name:"parsley", id:13, amount: 21},
        ]},
    {
        extendedIngredients:[
            {aisle:"Produce", name:"parsley", id:13, amount: 42},
        ]}
];


describe("TW1.1 shoppingList", function() {
    it("should add up ingredient amounts", function(){
        this.timeout(200000);  // increase to allow debugging during the test run

        const result= shoppingList(dishes);
        
        assert.equal(result.length, 3);
        assert.equal(result.filter(function(i){ return i.id==12;}).length, 1);
        assert.equal(result.filter(function(i){ return i.id==12;})[0].amount, 13.5);
        assert.equal(result.filter(function(i){ return i.id==13;}).length, 1);
        assert.equal(result.filter(function(i){ return i.id==13;})[0].amount, 63);
        assert.equal(result.filter(function(i){ return i.id==14;}).length, 1);
        assert.equal(result.filter(function(i){ return i.id==14;})[0].amount, 10);
    });
});
