import dishesConst from './dishesConst.js';
import { assert, expect, should } from 'chai';
import createUI from "./createUI.js";

const SummaryView= require('../src/views/'+TEST_PREFIX+'summaryView.js').default;

const {render, h}= require("vue");
window.React={createElement:h};

describe("TW1.2 SummaryView", function() {
    this.timeout(200000);  // increase to allow debugging during the test run
    

    it("UI test", function(){
        const div= createUI();
        render(<SummaryView people={4} ingredients={[]} />, div);
        console.log(div);
    });
});
