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
        const div= createUI();
        render(<SidebarView number={4} dishes={[]}/>, div);
        console.log(div);  // FIXME
    });
});
