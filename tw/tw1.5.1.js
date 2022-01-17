import render from "./teacherRender.js";
import dishesConst from "/test/dishesConst.js";

// make webpack load the file only if it exists
const SidebarView=require("/src/views/"+TEST_PREFIX+"sidebarView.js").default;

function getDishDetails(x){ return dishesConst.find(function(d){ return d.id===x;});}

render(
        <SidebarView number={3} dishes={[getDishDetails(200), getDishDetails(2), getDishDetails(100)]}/>,
    document.getElementById('root')
);
