const express = require('express')
const app = express()
const os = require('os')
require('dotenv/config');
const uri = process.env.DB_CONNECTION;
const config = require('config')
const PORT = process.env.PORT || 51000;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')

function getWeek(s, l) {
  let d = new Date()
  let day = d.getDay()
  let difference = (d - s) + ((s.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
  let oneDay = 1000 * 60 * 60 * 24;
  let dayNum = Math.floor(difference / oneDay);
  let week = (dayNum / 7) % l;
  return Math.floor(week);
}


// Config

app.set('view engine', 'ejs')

//Routing
app.get('/', (req, res) => {
  var result = [];
  const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  client.connect(err => {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const col = client.db("LunchSchedule").collection("LunchSchedTest");
    const cursor = col.find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      if(doc.Type == "WEEKLY") {
        doc['Week'] = getWeek(doc.Start, doc.Items[1].length)
      }
      result.push(doc);
    }, function() {
      client.close();
      res.render('index', {lines: result, colorTheme: 'light'})
    })
  });
});

app.get('/:json', (req, res) => {
  var result = [];
  if (req.params.json == 'lines.json') {
    const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
    client.connect(err => {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      const col = client.db("LunchSchedule").collection("LunchSchedTest");
      const cursor = col.find();
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        if(doc.Type == "WEEKLY") {
          doc['Week'] = getWeek(doc.Start, doc.Items[1].length)
        }
        result.push(doc)
      }, function() {
        client.close();
        res.json({lines: result})
      })
    });
  } else {
    res.send('No file').status(404)
  }
});


app.use("/", express.static(__dirname + "/"));


app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
