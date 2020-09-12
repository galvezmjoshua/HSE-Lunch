
/*
    REG - Regular
    HO - Holiday
    TG - Thanksgiving
*/

function LunchArray(){
    this.lunchArray = []; //2D Array comprised of the lines and lunches for the entire week.
    this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]; //Array of valid days, used as a parallel array to determine which column to select when a day is given (uses +1 to skip column of lines).
    this.lunchLines = ["MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, BREAKFAST"]; //Array of valid lines, used as a parrallel array to determine which row to use when a line is given.
    this.lunchType = ["REG", "HO", "TG"]; //Array of valid lunch types, abbreviated, key for meaning above.

    let data = s.rawData.fg;

    this.lunchArray = new Array(data.length - 1); //Intializing size based on # of rows and columns (-1 is to exclude Weekday Row)

    for(let i = 0; i < data.length - 1; i++){
        this.lunchArray[i] = new Array(6); //Column Length of 6 chosen for Line + weekdays
    }

    //Initializes lunchArray using magic (skips blank spot in document and is scaleable).
    this.lunchArray = data.slice(1, 9).map(mc => mc.c.map(mv => mv.v));

    //Returns lunch for the entire week for a specific line.
    this.getLunchForWeek = function(line){
        if(this.lunchLines.indexOf(line) == -1){
            throw "Provided line is not a valid input."
        }
        else{
            //Returns Array for specified lunch line, lunchLines array is used to find Row Index.
            return this.lunchArray[this.lunchLines.indexOf(line)];
        }
    }

    //Returns lunch for a specific day and specific line.
    this.getLunchForLineByDay = function(line, day){
        if(this.lunchLines.indexOf(line) == -1 || this.days.indexOf(day) == -1){
            throw "Provided line or day is not a valid input."
        }
        else{
            //Returns String of the index based on the given line and day.
            return this.lunchArray[this.lunchLines.indexOf(line)][this.days.indexOf(day) + 1];
        }
    }

    //Returns lunchArray
    this.getLunchArray = function(){
        return this.lunchArray;
    }

    this.getLunchLines = function(){
        return this.lunchLines;
    }

    this.getLunchTypes = function(){
        return this.lunchType;
    }

    this.getDays = function(){
        return this.days;
    }
}
