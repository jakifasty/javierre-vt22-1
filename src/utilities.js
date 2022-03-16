/*
  The API used in the lab (Spoonacular) returns dishes with several types, kept in an array such as
  ["brunch", "lunch", "main course"]
  From these types, we have to keep just one, either one of the 3 "known types" below.
  Most dishes returned by the API have exactly one of thes 3 "known" types.
  Your job is to write a callback that checks whether a given type is known.
  The callback will then be sent to `Array.filter()`, so we keep only knwon types. For example:

  ["brunch", "lunch", "main course"].filter(isKnownTypeCB)  will return ["main course"]
*/
const knownTypes=["starter", "main course", "dessert"];

function isKnownTypeCB(type){

    if ( knownTypes.indexOf(type) < 0 ) {return false}  //this means that this is not negative
    else {return true};

    //OR knownTypes.filter(knownTypes.indexOf(type))

    /*function anotherCB(knownType){
        if (knownTypes.indexOf(knownTypes.id) > 0) return 
        return knownTypes.filter(knownType);
    }
    knownTypes.find(anotherCB) */
}

/* Now pass the callback to `Array.filter()` */
function dishType(dish){
    if(dish.dishTypes !== undefined){  // or more general: if(dish.dishTypes)   , see JS truthy / falsy
        const tp = dish.dishTypes.filter(isKnownTypeCB); // pass the callback, i.e dishType
        if(tp.length > 0)
            return tp[0];
    }
    return "";
    // hint: once this function is completed, more tests should pass! Use the tests to check your work.
}

/* 
   Write a sort() comparator callback that compares dishes by their type, 
   so that all starters come before main courses and main courses come before desserts 
*/
function compareDishesCB(dishA, dishB){ //__give_a_proper_name_CB

    if(knownTypes.indexOf(dishType(dishA)) < knownTypes.indexOf(dishType(dishB))) //these line compares both dishes
        return -1;
    if(knownTypes.indexOf(dishType(dishA)) > knownTypes.indexOf(dishType(dishB)))
        return 1;
    else
        return 0;
}

/* 
   We sort the dishes using the comparator above.
   Note that sort() will change the original array. 
   To avoid that, use [...dishes] which creates a new array and spreads the elements of the `dishes` array.
*/
function sortDishes(dishes){
    return dishes = [... dishes.sort(compareDishesCB)];
}

function compareIngredientsByAisleAndNameCB(ingredientA, ingredientB){ //__give_a_proper_name_CB

    if (ingredientA["aisle"] < ingredientB["aisle"])
        return -1;
    if (ingredientA["aisle"] > ingredientB["aisle"])
        return 1;
    else
        if (ingredientA["name"] < ingredientB["name"]) 
            return -1;
        if (ingredientA["name"] > ingredientB["name"])
            return 1;
        return 0;
    return 0;
}

/* 
   Given an array of ingredients, we would like to order them by supermarket aisle. If the aisles are the same, we order them by name 
   Each ingredient object has aisle and name properties.
   You know the drill: write a comparator callback, then pass it to Array.sort(). 
   Remember that sort changes the original array and we don't want that.
*/
function sortIngredients(ingredients){
    const ingredientsRec = [...ingredients];
    return ingredients = [...ingredientsRec.sort(compareIngredientsByAisleAndNameCB)];
}

/* 
   Given a menu of dishes, generate a list of ingredients. 
   If an ingredient repeats in several dishes, it will be returned only once, with the amount added up 
   
   As this is not an algorithm course, the function is mostly written but you have 2 callback passing TODOs.
*/
function shoppingList(dishes){
    // we define the callback inside the function, though this is not strictly needed in this case. But see below.
    function keepJustIngredientsCB(dish){
        return dish.extendedIngredients;
    }
    
    const result={}; // object used as mapping between ingredient ID and ingredient object

    // ingredientCB must be defined inside shopingList() because it needs access to `result`
    // you will often need to define a callback inside the function where it is used, so it has access to arguments and other variables
    function ingredientCB(ingredient){
        if(result[ingredient.id] === undefined){  // more general: !result[ingredient.id]  --> if(!result[ingredient.id])
            // since result[ingredient.id] is not defined, it means that the ingredient is not taken into account yet
            // so we associate the ingredient with the ID
            result[ingredient.id]={...ingredient};
            
            // JS Notes about the line above:
            // 1)    result[ingredient.id] 
            // In JS object.property is the same as object["property"] but the second notation is more powerful because you can write
            // object[x]  where x=="property"
            
            // 2)    {...ingredient } creates a *copy* of the ingredient (object spread syntax)
            // we duplicate it because we will change the object below
        } else {
            // since result[ingredient.id] is not defined, it means that the ingredient has been encountered before.
            // so we add up the amount:
            result[ingredient.id].amount +=  ingredient.amount;
        }
    }

    /*const arrayOfIngredientArrays= dishes.map(keepJustIngredientsCB); //or, if not, try ingredientCB
    const allIngredients= arrayOfIngredientArrays.flat();    
    allIngredients.forEach(ingredientCB); */

    // Note: the 3 lines above can be written as a function chain: dishes.map(callback1).flat().forEach(callback2);

    dishes.map(keepJustIngredientsCB).flat().forEach(ingredientCB);

    return Object.values(result); // now we transform the result object into an array: we drop the keys and only keep the values
}

/* Given a dish array, calculate their total price with a map-reduce callback exercise */
function menuPrice(dishesArray){

    //callback1: given a dish, return its price. Look in /test/dishesConst.js to find out the name of the dish price property.
    function priceOfDishCB(dish){
        return dish["pricePerServing"];
    }

    //callback2, with two parameters. Return the sum of the parameters
    function sumParamsCB(param1, param2){
        return param1 + param2;
    }
    
    //dishesArray.map() will return an array of prices.
    const dishesArrayRec = [... dishesArray];
    const arrayOfPrices = dishesArrayRec.map(priceOfDishCB);

    //reduce() with the second callback as first parameter, and 0 as second parameter (we compute the total starting from zero).
    const sumOfPricesOfArray = arrayOfPrices.reduce(sumParamsCB, 0); //This will produce the total price, which you return
    return sumOfPricesOfArray;

}
/*
  At this point, all of TW1.1 tests should pass!
*/

/*
  allIngredients.reduce(amountReducerCB, {}), i.e. use an object as accumulator.
  
  To create new objects in the reducer CB, you can use either spread syntax {...object, other:property}  or Object.assign() 

  shoppingList() then becomes:
  return Object.values(dishes.map(callback1).flat().reduce(amountReducerCB, {}))
  
  And you can even move both callback definitions outside shoppingList() . Creating functions inside functions is more expensive 
  because the new function object is re-created and interpreted every time the enclosing function runs.
*/

export {isKnownTypeCB, dishType, sortDishes, sortIngredients, shoppingList, menuPrice};

