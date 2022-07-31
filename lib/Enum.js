// Enum helper class. Very basics of what we need
export class Enum {
    constructor(list) {
        // Converts a list of items into an enum
        this.objEnum = {};
        
        // Storing the data as a list for easier access of the values
        list.forEach((val, i) => {
            this.objEnum[val] = val;
        });
    }
    
    get(itemId) {
        return this.objEnum[itemId];
    }
    
    keys() {
        return Object.keys(this.objEnum);
    }
    
    // add(itemId) {
    //     if (!(itemId in Object.keys(this.objEnum))) {
    //         this.objEnum[itemId] = itemId;
    //     }   
    // }
}