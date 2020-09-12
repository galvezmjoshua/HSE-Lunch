
function LunchLine(line){
    //Assume that all arrays are ordered parallel to the days array (0 - Week1, 1 - Tuesday, etc)
    this.weekLunchType = []; //Array of all of the lunch types for the week (REGULAR, HOLIDAY, ETC)
    this.entrees = []; //Array of entrees for the week.
    this.fruits = []; //Array of grains for the week.
    this.vegetables = []; //Array of vegetables for the week.
    this.sheetData; //Google sheets data array hell
    this.lunchLine = line.toUpperCase(); //Lunch line passed, converted to uppercase for LunchArray compatibility.
    this.lines = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'BREAKFAST']

    lA = new LunchArray();

    //Validates if the lunch line passed is valid and fills weekLunchType array and sheetData
    if(this.lines.includes(this.lunchLine)){
        this.sheetData = lineSheets[(this.lines.indexOf(this.lunchLine))].rawData.fg; //Takes the lineSheets array in main.js then passes the index of the appropriate lunch line to then pull out the proper index for the Sheet object
    }
    else{
        throw "Invalid lunch line passed."
    }

    if(this.weekLunchType.includes("HO") || this.weekLunchType.includes("TG")){
        //Add special code...
        //Plan is to have an extra set of rows below the normal lunch, and in the case of suprise food options, I may add a type called "One-Off" or OO to handle those.
    }
    else{
        this.entrees = this.sheetData[1].c.splice(1,5).map(entr => entr.v); //Gets entrees from sheetData, splices from 1 to avoid first column
        this.vegetables = this.sheetData[2].c.splice(1,5).map(vegt => vegt.v); //Gets grains from sheetData, splices from 1 to avoid first column
        this.fruits = this.sheetData[3].c.splice(1,5).map(fruit => fruit.v); //Gets vegetables from sheetData, splices from 1 to avoid first column
    }

    //Returns the entree, grain, and vegetable (in that order) offered for the day passed.
    this.getLunchForDay = function(day){
        let dayIndex = lA.getDays().indexOf(day); //days array is used in parallel with entrees, grains, and vegetables arrays.
        if(dayIndex == -1)
            throw "Invalid day passed."
        return [this.entrees[dayIndex], this.grains[dayIndex], this.vegetables[dayIndex]];
    }
}
