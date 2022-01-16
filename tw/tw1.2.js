import render from "./teacherRender.js";
import dishesConst from "/test/dishesConst.js";

// make webpack load the file only if it exists
const SummaryView=require("/src/views/"+TEST_PREFIX+"summaryView.js").default;
const {shoppingList}=require("/src/"+TEST_PREFIX+"utilities.js");

render(
        <SummaryView people={3} ingredients={shoppingList(dishesConst)}/>,
    document.getElementById('root')
);

//window.myModel= require("/src/vuejs/VueRoot.js").proxyModel;
    
