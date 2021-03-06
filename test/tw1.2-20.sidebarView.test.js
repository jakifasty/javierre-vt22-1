import dishesConst from './dishesConst.js';
import { assert, expect, should } from 'chai';
import createUI from "./createUI.js";

let SidebarView;
const X= TEST_PREFIX;
try{
   SidebarView= require('../src/views/'+X+'sidebarView.js').default;
}catch(e){};

const {render, h}= require("vue");
window.React={createElement:h};

describe("TW1.2 SidebarView", function() {
    this.timeout(200000);  // increase to allow debugging during the test run

    before(function(){
        if(!SidebarView) this.skip();
    });

    it("SidebarView shows its number prop", function(){
        let div= createUI();
        render(<SidebarView number={4} dishes={[]}/>, div);
        assert.equal(div.querySelectorAll("button").length, 2);
        assert.equal(div.querySelectorAll("button")[0].firstChild.textContent, "-");
        assert.equal(div.querySelectorAll("button")[1].firstChild.textContent, "+");
        assert.equal(div.querySelectorAll("button")[0].nextSibling.textContent, "4");

    });
    it("SidebarView minus button should be disabled if number prop is 1", function(){
        let div= createUI();
        render(<SidebarView number={1} dishes={[]}/>, div);
        assert.equal(div.querySelectorAll("button").length, 2);
        assert.equal(div.querySelectorAll("button")[0].firstChild.textContent, "-");
        assert.equal(div.querySelectorAll("button")[0].disabled, true);
        assert.equal(div.querySelectorAll("button")[1].firstChild.textContent, "+");
        assert.equal(div.querySelectorAll("button")[0].nextSibling.textContent, "1");
        
    });
});
