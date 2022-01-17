import dishesConst from './dishesConst.js';
import { assert, expect, should } from 'chai';
import createUI from "./createUI.js";
import installOwnCreateElement from "./jsxCreateElement.js";

var DinnerModel= require('../src/'+TEST_PREFIX+'DinnerModel.js').default;

const Summary= require('../src/vuejs/'+TEST_PREFIX+'summaryPresenter.js').default;
const SummaryView= require('../src/views/'+TEST_PREFIX+'summaryView.js').default;

const Sidebar= require('../src/vuejs/'+TEST_PREFIX+'sidebarPresenter.js').default;
const SidebarView= require('../src/views/'+TEST_PREFIX+'sidebarView.js').default;

const App= require('../src/views/'+TEST_PREFIX+'app.js').default;

const VueRoot=require("/src/vuejs/"+TEST_PREFIX+"VueRoot.js").default;

const {render, h}= require("vue");

function traverseJSX({tag, props, children}=window.lastJSXRender){
    if(!children)
        return [{tag, props}];
    return [{tag, props}, ... children.map(child=> traverseJSX(child))].flat();
}
describe("TW1.4 Model-View-Presenter", function() {
    this.timeout(200000);  // increase to allow debugging during the test run
    

    it("Vue Summary presenter renders SummaryView with people prop", function(){
        installOwnCreateElement();
        Summary({model: new DinnerModel()});

        assert(window.lastJSXRender.tag);
        expect(window.lastJSXRender.tag.toString()).to.equal(SummaryView.toString());
        expect(window.lastJSXRender.props);
        expect(window.lastJSXRender.props.people).to.equal(2);
    });

    it("Vue Sidebar presenter renders SidebarView with number prop", function(){
        installOwnCreateElement();
        expect(Sidebar);
        Sidebar({model: new DinnerModel()});

        assert(window.lastJSXRender.tag);
        expect(window.lastJSXRender.tag.toString()).to.equal(SidebarView.toString());
        expect(window.lastJSXRender.props);
        expect(window.lastJSXRender.props.number).to.equal(2);
    });

    it("Vue Sidebar presenter renders SidebarView with correct custom event handler", function(){
        installOwnCreateElement();
        expect(Sidebar);
        const model= new DinnerModel();
        Sidebar({model});

        expect(typeof window.lastJSXRender.props.onNumberChange).to.equal("function");
        // we can apply the callback, the model should change!
        window.lastJSXRender.props.onNumberChange(3);
        expect(model.numberOfGuests).to.equal(3);
        window.lastJSXRender.props.onNumberChange(5);
        expect(model.numberOfGuests).to.equal(5);
        
    });

    it("App renders Sidebar, then Summary", function(){
        installOwnCreateElement();
        App({model: new DinnerModel()});
        expect(window.lastJSXRender.tag).to.equal("div");

        const components= traverseJSX().filter(function keepFunctionalComponents({tag, props}){
            return typeof(tag)=="function";
        });
        expect(components.length).to.be.gte(2);
        expect(components[0].tag.toString()).to.equal(Sidebar.toString());
        expect(components[1].tag.toString()).to.equal(Summary.toString());
    });

    it("Integration test: pressing UI buttons changes number in Model", function(){
        window.React={createElement:h};

        let div= createUI();

        render(<VueRoot />,div);
        let myModel= require("/src/vuejs/"+TEST_PREFIX+"VueRoot.js").proxyModel;

        expect(div.querySelector('span[title]').firstChild.textContent).to.equal("2");
        div.querySelectorAll("button")[0].click();
        expect(myModel.numberOfGuests).to.equal(1);
        div= createUI();

        render(<VueRoot />,div);
        myModel= require("/src/vuejs/"+TEST_PREFIX+"VueRoot.js").proxyModel;

        div.querySelectorAll("button")[0].click();
        expect(myModel.numberOfGuests).to.equal(1);
        
    });
    
});
