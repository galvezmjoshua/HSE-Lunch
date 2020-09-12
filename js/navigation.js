var screenStack = ["allLinesScreen"]
var screens = ["allLinesScreen", "selectedLineScreen", "breakfastScreen"];
var screenNames = ["Home", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Breakfast"];
var currentLine;

function goTo(name) { // Takes a screen name value.
  let i = screenNames.indexOf(name);

  if (i == 0) { // For allLinesScreen.
    screenStack.push("allLinesScreen") // Adds allLinesScreen to the top of stack.
    display(screenStack[screenStack.length - 1]) // Displays allLinesScreen.

  } else if (i > 0 && i < 6) { // For selectedLineScreen.
    screenStack.push("selectedLineScreen") // Adds selectedLineScreen to the top of stack.
    display(screenStack[screenStack.length - 1]) // Displays selectedLineScreen.
    currentLine = name; // Updates currentLine.

  } else if (i == 6) { // For creditsScreen.
    screenStack.push("breakfastScreen") // Adds creditsScreen to the top of stack.
    display(screenStack[screenStack.length - 1]) // Displays creditsScreen.
  } else {

  }
  update()
}

function goBack() {
  document.getElementById(screenStack[screenStack.length - 1]).scrollTop = 0;
  display(screenStack[screenStack.length - 2])
  screenStack.pop()
  update()
}

function display(screen) {
  screens.forEach((scr) => {
    document.getElementById(scr).style.display = "none";
  });
  document.getElementById(screen).style.display = "block";
}

function updateHeader(name) {
  document.getElementById("header").innerHTML = name;
}
