var lunchLines = ["Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Breakfast'];
const sheetURL = "https://docs.google.com/spreadsheets/d/1Ywju7F9ILvsXKJ3XQAHfz4Q3xGGt6sJXyRXrXZe-M1g/gviz/tq?sheet=";
const s = new Sheet(sheetURL);
const lineSheets = [];
var mon, tue, wed, thur, fri, brk;
var d;
var day;
var week;
var start;

var lineArray;

load();

async function load() {
  jQuery.get('lines.json', function(data) {
      lineArray = data;
  });
  await loadGoogleCharts();
  await s.getRawData();
  initializeSheets();
  for(let i = 0; i < lineSheets.length; i++)
      await lineSheets[i].getRawData();
  d = new Date()
  day = d.getDay()
  start = new Date(d.getFullYear(), 9, 26)
  let difference = (d - start) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
  var oneDay = 1000 * 60 * 60 * 24;
  let dayNum = Math.floor(difference / oneDay);
  week = (dayNum / 7) % 3;
  if (week < 1) {
    week = 0
  } else if (week < 2) {
    week = 1;
  } else {
    week = 2;
  }

  mon = new LunchLine("monday")
  tue = new LunchLine("tuesday")
  wed = new LunchLine("wednesday")
  thur = new LunchLine("thursday")
  fri = new LunchLine("friday")
  brk = new LunchLine("breakfast")

  update();
  console.log("loaded")
  setTimeout(load, 10000);
}

function initializeSheets() {
    for(let i = 0; i < 6; i++)
        lineSheets.push(new Sheet(sheetURL + lunchLines[i]))
}
