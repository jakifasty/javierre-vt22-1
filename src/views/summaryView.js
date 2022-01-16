/* Functional JSX component. Name starts with capital letter */
function SummaryView(props){
    return (
            <div class="debug">
                Summary for <span title="nr guests">{props.people}</span> persons:
            
                {  //  <---- we are in JSX; with this curly brace, we go back to JavaScript, and can write JS code and comments.
                   // Then we can come back to JSX <tags>
            
                   /* TODO uncomment this at TW1.5, it won't work before because props.ingredinets is not set.
                       renderIngredients(props.ingredients) */
                }
            </div>
    );
}

/* For TW1.5. If you are at TW1.2, wait :) */
/* This is an ordinary JS function, not a component. It will be invoked from the component above */
function renderIngredients(ingredientArray){
    function ingredientTableRowCB(ingr){
        return <tr> <td>{ingr.name}</td>   <td>TODO aisle</td>  <td>TODO quantity</td>
                    <td class="TODO">{/*TODO measurement units, with two decimals, use a CSS class to align right*/}</td>  </tr>;
    }
    
    
    return <table>
        <thead>
               <tr> <th>Name</th>         <th>Aisle</th>         <th>Quantity</th>     <th>unit</th>  </tr>
        </thead>
        <tbody>

           {  //  <---- we are in JSX, with this curly brace, we go back to JavaScript
        
             ingredientArray.map(/*TODO send callback here */)
             // TODO sort the ingredients. Import the needed function from utilities.js 
          }

        </tbody>
        </table>;
}

export default SummaryView;
export {renderIngredients};   // we export so that tests can analyze the source code
