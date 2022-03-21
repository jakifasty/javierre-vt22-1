import { menuPrice, dishType, sortDishes} from "../utilities.js"

function sidebarView(props){
    return (
            <div>
                <button type="button" onclick={function clickACB(event){props.onNumberChange(props.number-1)}} disabled={props.number<=1? true : false}>-</button>
                <span title="nr guests">{props.number}</span>
                <button type="button" onclick={function clickACB(event){props.onNumberChange(props.number+1)}}>+</button>
                {renderDishes(props.setDish, props.onRemove, props.dishes, props.number)}
            </div>
    );
}

function renderDishes(setDish, onRemove, dishes, number){
    function dishesTableRowCB(dish){
        return     <tr key={dish.id}>
                    <td>
                      <button onClickCapture= {function clickACB(e){onRemove(dish);}}>x</button>
                    </td>
                    <td onClickCapture={function clickACB(e){setDish(dish);}}>
                      <a href="#">{dish.title}</a>
                    </td>
                    <td>
                      {dishType(dish)}
                    </td>
                    <td class="right">
                      {(dish.pricePerServing*number).toFixed(2)}
                    </td>
                  </tr>
    }

    return <table>
        <thead>
        </thead>
        <tbody>
            {  //  <---- we are in JSX, with this curly brace, we go back to JavaScript
                sortDishes(dishes).map(dishesTableRowCB) //sort the ingredients. Import the needed function from utilities.js
            }
            <tr>
                <td>
                </td>
                <td>
                    Total
                </td>
                <td>
                </td>
                <td class="right">
                    {(menuPrice(dishes)*number).toFixed(2)}
                </td>
            </tr>
        </tbody>
        </table>;
}

export default sidebarView;
