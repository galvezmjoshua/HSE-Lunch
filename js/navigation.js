var screenStack = ["homeScreen"]
var screens = ["homeScreen", "menuScreen", "creditsScreen"];
var currentLine;

function goTo(name) { // Takes a screen 'name' value.
  console.log(getIndex(name))
  if(name == "Home") {
    screenStack.push("HomeScreen")
    display(screenStack[screenStack.length - 1])
    console.log("Home")
  } else if(getIndex(name) != -1) {
    screenStack.push("menuScreen")
    display(screenStack[screenStack.length - 1])
    currentLine = name;
    console.log(name)
  } else if(name == "Credits") {
    screenStack.push("creditsScreen")
    display(screenStack[screenStack.length - 1])
    console.log("Credits")
  }
  update() // Updates the screen the app is going to
}

function goBack() { // Goes back a screen
  document.getElementById(screenStack[screenStack.length - 1]).scrollTop = 0; // Resets position on the scren
  display(screenStack[screenStack.length - 2])
  screenStack.pop()
  update() // Updates the screen the app is going back to
}

function display(s) { // Hides all screens, then shows screen 's'
  screens.forEach((scr) => {
    document.getElementById(scr).style.display = "none";
  });
  document.getElementById(s).style.display = "block";

}

function updateHeader(name) { // Currently unused
  document.getElementById("header").innerHTML = name;
}
