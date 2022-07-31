// Enum helper class. Very basics of what we need
class Enum {
    constructor(list) {
        // Converts a list of items into an enum
        this.objEnum = {};
        
        // Storing the data as a list for easier access of the values
        list.forEach((val, i) => {
            this.objEnum[val] = val;
        });
    }
    
    get(item) {
        // Returns the item as a string
        return this.objEnum[item];
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

module.exports = Enum;