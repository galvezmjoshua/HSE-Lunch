function update() {
  switch(screenStack[screenStack.length - 1]){
    case "allLinesScreen":
      updateAllLines()
      break;
    case "selectedLineScreen":
      updateSelectedLine(currentLine)
      break;
    case "breakfastScreen":
      updateSelectedLine(currentLine)
      returnForEachDay("Breakfast")
      updateHeader("Breakfast")
      break;
    case "creditsScreen":
      updateCredits()
        break;
    default:
      updateAllLines()
      break;
  }
}

function updateCredits() {
  updateHeader("Info")
}

function updateAllLines() {
  updateHeader(getWeekName())

  returnEntrees("mondayLineEntrees", week, "Monday")
  returnEntrees("tuesdayLineEntrees", week, "Tuesday")
  returnEntrees("wednesdayLineEntrees", week, "Wednesday")
  returnEntrees("thursdayLineEntrees", week, "Thursday")
  returnEntrees("fridayLineEntrees", week, "Friday")
  returnEntrees("breakfastLineEntrees", day - 1, "Breakfast")
  document.getElementById('breakfastButton').innerHTML = 'Breakfast (' + getDayName() + ')';
}

function updateSelectedLine(line) {
  currentLine = line;

  updateHeader(line)
  returnForEachWeek(line)
}

function getDayName() {
  if (day == 1) {
    return "Mon"
  }
  if (day == 2) {
    return "Tue"
  }
  if (day == 3) {
    return "Wed"
  }
  if (day == 4) {
    return "Thur"
  }
  if (day == 5) {
    return "Fri"
  }
  return "Next Monday"
}

function getWeekName() {
  if (week == 0) {
    return "Week 1"
  }
  if (week == 1) {
    return "Week 2"
  }
  if (week == 2) {
    return "Week 3"
  }
  return "Next Week"
}

function returnForEachWeek(line) {
  returnEntrees("week1EntreeItems", 0, line)
  returnFruits("week1FruitItems", 0, line)
  returnVegetables("week1VegItems", 0, line)

  returnEntrees("week2EntreeItems", 1, line)
  returnFruits("week2FruitItems", 1, line)
  returnVegetables("week2VegItems", 1, line)

  returnEntrees("week3EntreeItems", 2, line)
  returnFruits("week3FruitItems", 2, line)
  returnVegetables("week3VegItems", 2, line)
}

function returnForEachDay(line) {
  returnEntrees("mondayEntreeItems", 0, line)

  returnEntrees("tuesdayEntreeItems", 1, line)

  returnEntrees("wednesdayEntreeItems", 2, line)

  returnEntrees("thursdayEntreeItems", 3, line)

  returnEntrees("fridayEntreeItems", 4, line)

}

function returnEntrees(divItem, d, s) {
  if((d > 0 && d < 3) || (s === "Breakfast" && d > 0 && d < 5)) {
    document.getElementById(divItem).innerHTML = lineArray.lines[getIndex(s)]["Entree"][d].replace(/\//gi, "<br>");
  } else {
    document.getElementById(divItem).innerHTML = lineArray.lines[getIndex(s)]["Entree"][0].replace(/\//gi, "<br>");
  }
}

function returnFruits(divItem, d, s) {
  if(d > 0 && d < 3) {
    document.getElementById(divItem).innerHTML = lineArray.lines[getIndex(s)]["Fruit"][d].replace(/\//gi, "<br>");
  } else {
    document.getElementById(divItem).innerHTML = lineArray.lines[getIndex(s)]["Fruit"][0].replace(/\//gi, "<br>");
  }
}

function returnVegetables(divItem, d, s) {
  if(d > 0 && d < 3) {
    document.getElementById(divItem).innerHTML = lineArray.lines[getIndex(s)]["Vegetable"][d].replace(/\//gi, "<br>");
  } else {
    document.getElementById(divItem).innerHTML = lineArray.lines[getIndex(s)]["Vegetable"][0].replace(/\//gi, "<br>");
  }
}

function getIndex(l) {
  for(let j = 0; j < lineArray.lines.length; j++) {
    if(lineArray.lines[j].Line == l) {
      return j;
    }
  }
  return -1;
}
