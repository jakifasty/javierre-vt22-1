export default function installOwnCreateElement(){
    window.React={createElement: function(tag, props, ...children){
        return window.lastJSXRender={tag, props, children};
    }};
}
