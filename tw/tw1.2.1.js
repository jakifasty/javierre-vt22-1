import render from "./teacherRender.js";
import dishesConst from "/test/dishesConst.js";

// make webpack load the file only if it exists
const X= TEST_PREFIX;
let SidebarView;

try{
    SidebarView=require("/src/views/"+X+"sidebarView.js").default;
}catch(e){
    render(<div>Please define /src/views/{X}sidebarView.js</div>,  document.getElementById('root'));
}
if(SidebarView)    
    render(
            <SidebarView number={5} dishes={[]} />,
        document.getElementById('root')
    );

    //window.myModel= require("/src/vuejs/VueRoot.js").proxyModel;
    
