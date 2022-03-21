//sidebarPresenter.js file
import SidebarView from "../views/sidebarView.js"; //sidebarPresenter.js file
import {shoppingList} from "../utilities.js"

export default
function Sidebar(props){

    function onNumberChangeACB(number){ //added function
        props.model.setNumberOfGuests(number);
    }

    function removeDishACB(dish){ //added function to remove a dish from the menu
        props.model.removeFromMenu(dish); //this passes the 
    }

    function setCurrentDishACB(dish){ //added function to add a dish to the menu
        props.model.setCurrentDish(dish.id); //this passes the ID of the dish
    }

    return <SidebarView onNumberChange={onNumberChangeACB} number={props.model.numberOfGuests} dishes={props.model.dishes} 
            onRemove={removeDishACB} setDish={setCurrentDishACB}/>; 
            //numberChangeACB should invoke the appropiate method of the model
            //removeFromMenu and currentDish are custom event handlers
}