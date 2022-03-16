import SummaryView from "../views/summaryView.js";
import {shoppingList} from "../utilities";
import DinnerModel from "../DinnerModel.js";

export default
function Summary(props){
    return <SummaryView people={props.model.numberOfGuests} ingredients={shoppingList(props.model.dishes)}/>;
}