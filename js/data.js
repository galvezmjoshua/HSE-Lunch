function update() {
  if(screenStack[screenStack.length - 1] == "homeScreen") { // homeScreen updates
    document.getElementById("homeScreen").innerHTML = `
    <div style="width:100%; height:9.5vh"></div>
    `;
    lineArray.forEach(line => {
      document.getElementById("homeScreen").innerHTML += lineDisplay(line);
    })
    document.getElementById("homeScreen").innerHTML += `
    <div onclick="location.reload();
return false;" style="margin-left:auto; margin-right:auto; color: #2a8ff757; width: fit-content;">Refresh</div>
    <div style="width:100%; height:12.5vh"></div>
    `;
  }

  if(screenStack[screenStack.length - 1] == "menuScreen") { // menuScreen updates
    document.getElementById("menuScreen").innerHTML = `
    <div style="width:100%; height:9.5vh"></div>
    <div class="contentContainer" onclick="">
      ${menuDisplay(lineArray[getIndex(currentLine)])}
    </div>
    <div style="margin-left:auto; margin-right:auto; color: #2a8ff757; width: fit-content;">Go Back</div>
    <div style="width:100%; height:12.5vh"></div>
    `;
  }
}

function getIndex(lineName) { // Gets the index of a line from the lineArray
  for(let i = 0; i < lineArray.length; i++) {
    if(lineArray[i].Line == lineName) {
      return i;
    }
  }
  return -1;
}
