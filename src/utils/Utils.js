class Utils {

    /**
     * 
     * @param {Array<String>} a 
     * @param {Array<String>} b 
     */
    static compareStringArrays(a,b){
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
      
        a.sort((x1,x2) => x1.localeCompare(x2));
        b.sort((x1,x2) => x1.localeCompare(x2));
      
        for (let i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
    }

    /**
     * 
     * @param {Object} argsObj
     * @returns {Array<String>} 
     */
    static getArgsNamesArrayFromObject(argsObj){
        const argsArray = [];
        for (let i in argsObj) {
            if (argsObj.hasOwnProperty(i)) {
                argsArray.push(i);
            }
        }
        return argsArray;
    }
}

module.exports = Utils;