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
      returnForEachDay(brk)
      break;
    default:
      updateAllLines()
      break;
  }
}

function updateCredits() {
  updateHeader("Credits")
}

function updateAllLines() {
  updateHeader(getWeekName())

  returnEntrees("mondayLineEntrees", week, mon)
  returnEntrees("tuesdayLineEntrees", week, tue)
  returnEntrees("wednesdayLineEntrees", week, wed)
  returnEntrees("thursdayLineEntrees", week, thur)
  returnEntrees("fridayLineEntrees", week, fri)
  returnEntrees("breakfastLineEntrees", day, brk)
}

function updateSelectedLine(line) {
  currentLine = line;

  switch(line){
    case "Monday":
      updateHeader("Monday")
      returnForEachWeek(mon)
      break;
    case "Tuesday":
      updateHeader("Tuesday")
      returnForEachWeek(tue)
      break;
    case "Wednesday":
      updateHeader("Wednesday")
      returnForEachWeek(wed)
      break;
    case "Thursday":
      updateHeader("Thursday")
      returnForEachWeek(thur)
      break;
    case "Friday":
      updateHeader("Friday")
      returnForEachWeek(fri)
      break;
    case "Breakfast":
      updateHeader("Breakfast")
      returnForEachDay(brk)
      break;
    default:
      break;
  }
}






function getDayName() {
  if (day == 1) {
    return "Monday"
  }
  if (day == 2) {
    return "Tuesday"
  }
  if (day == 3) {
    return "Wednesday"
  }
  if (day == 4) {
    return "Thursday"
  }
  if (day == 5) {
    return "Friday"
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
  return "Next Week"
}

function returnForEachWeek(line) {
  returnEntrees("week1EntreeItems", 0, line)
  returnFruits("week1FruitItems", 0, line)
  returnVegetables("week1VegItems", 0, line)

  returnEntrees("week2EntreeItems", 1, line)
  returnFruits("week2FruitItems", 1, line)
  returnVegetables("week2VegItems", 1, line)

}

function returnForEachDay(line) {
  returnEntrees("mondayEntreeItems", 0, line)

  returnEntrees("tuesdayEntreeItems", 1, line)

  returnEntrees("wednesdayEntreeItems", 2, line)

  returnEntrees("thursdayEntreeItems", 3, line)

  returnEntrees("fridayEntreeItems", 4, line)

}

function returnEntrees(divItem, d, s){
  if((d > 0 && d < 3) || (s === brk && d < 5)) {
    document.getElementById(divItem).innerHTML = s["entrees"][d].replace(/\//gi, "<br>");
  } else {
    document.getElementById(divItem).innerHTML = s["entrees"][0].replace(/\//gi, "<br>");
  }
}

function returnFruits(divItem, d, s){
  if(d > 0 && d < 3) {
    document.getElementById(divItem).innerHTML = s["fruits"][d].replace(/\//gi, "<br>");
  } else {
    document.getElementById(divItem).innerHTML = s["fruits"][0].replace(/\//gi, "<br>");
  }
}

function returnVegetables(divItem, d, s){
  if(d > 0 && d < 3) {
    document.getElementById(divItem).innerHTML = s["vegetables"][d].replace(/\//gi, "<br>");
  } else {
    document.getElementById(divItem).innerHTML = s["vegetables"][0].replace(/\//gi, "<br>");
  }
}