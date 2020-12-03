var date;
var today;  // Ex: 'Monday', 'Tuesday', etc.

var lineArray;

load();

async function load() { // When the app is first loaded
  await jQuery.get('lines.json', function(data) { // Gets the lunch line data
      lineArray = data.lines;
  });
  d = new Date()
  today = d.getDay() - 1;

  update(); // Updates the screen the app is at
}
