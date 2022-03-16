/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graohics or interaction
*/
class DinnerModel{
    constructor(nrGuests=2, dishArray=[], currentDish){
        this.setNumberOfGuests(nrGuests);
        this.dishes = dishArray;
    }
    setNumberOfGuests(nr){
        
        // throw an error if the argument is smaller than 1 or not an integer
        // the error message must be exactly "number of guests not a positive integer"
        // to check for integer: test at the console Number.isInteger(3.14)

        if(Number.isInteger(nr) & nr>0)
                this.numberOfGuests = nr;
        else 
            throw new Error ('number of guests not a positive integer');

        // when this is done the TW1.1 DinnerModel "can set the number of guests" should pass
        // also "number of guests is a positive integer"
    }
    addToMenu(dishToAdd){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the previous value
        this.dishes= [...this.dishes, dishToAdd];
    }
    
    removeFromMenu(dishToRemove){
        // callback exercise! Also return keyword exercise
        function hasSameIdCB(dish){
            // return true if the id property of dish is _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
            if(dishToRemove.id != dish.id) 
                return true;
        }
        this.dishes= this.dishes.filter(hasSameIdCB);
        // the test "can remove dishes" should pass
        return this.dishes;
    }
    /* 
       ID of dish currently checked by the user.
       A strict MVC/MVP Model would not keep such data, 
       but we take a more relaxed, "Application state" approach. 
       So we store also abstract data that will influence the application status.
     */
    setCurrentDish(id){
        this.currentDish = id; //the current dish is the provided id
    }

    addObserver(callback){
        this.observers = callback;
    }

    removeOberver(callback){
        this.observers.forEach();
        this.observers= this.observers.filter(callback)
    }

    //this method will be called 
    notifyObservers(payload){
        try{
            this.observers.forEach(function invokeObserverCB(obs){obs(payload);}) //payload is used for the persistance
        }
        catch(err){
            console.error(err);
        }
    }

}

export default DinnerModel;
