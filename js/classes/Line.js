function menuDisplay(line) {  // Constructs the html for the menuScreen
  let numberOfItems = line.Items[0].length;
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  let innerHTML = ``;
  if(line.Type == 'REG') {  // Checks if 'line' is a REG line
    for(let i = 0; i < days.length; i++) {  // Loops through for the number of days
      innerHTML+= `<div><div class="dayText">${days[i]}</div>`;
      for(let j = 0; j < numberOfItems; j++) {  // Loops through each item array
        if(line.Items !== null) {
          innerHTML+= `<div class="itemType">${line.Items[0][j]}</div>`;
          innerHTML+= `<div class="items">${line.Items[j + 1][i].replace(/\//gi, `<br>`)}</div>`;
        }
      }
      innerHTML+= `</div>`;
    }
  } else if (line.Type == 'WEEKLY') { // Checks if 'line' is a WEEKLY line
    for(let i = 0; i < line.Items[1].length; i++) { // Loops through for the number of weeks
      innerHTML+= `<div><div class="dayText">${`Week ` + (i + 1)}</div>`;
      for(let j = 0; j < numberOfItems; j++) {  // Loops through each item array
        if(line.Items !== null) {
          innerHTML+= `<div class="itemType">${line.Items[0][j]}</div>`;
          innerHTML+= `<div class="items">${line.Items[j + 1][i].replace(/\//gi, `<br>`)}</div>`;
        }
      }
      innerHTML+= `</div>`;
    }
  }
  return innerHTML;
}

function lineDisplay(line) { // Constructs the html for homeScreen
  let innerHTML = `
  <div class="lineButton" onclick="goTo('${line.Line}')">
  <div class="lineButtonText">${line.Line}</div>
  <div class="lineItems">
  `;
  let day = today;
  if (today > 4 || today < 0) {
    day = 0;
  }
  console.log(day)

  if(line.Type == 'REG') {  // Checks if 'line' is a REG line
    innerHTML+= line.Items[1][day].replace(/\//gi, `<br>`);
  } else if (line.Type == 'WEEKLY') { // Checks if 'line' is a WEEKLY line
    innerHTML+= line.Items[1][line.Week].replace(/\//gi, `<br>`);
  }
  innerHTML+= `</div></div>`;
  return innerHTML;
}
