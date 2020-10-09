const express = require('express')
const app = express()
const os = require('os')
require('dotenv/config');
const uri = process.env.DB_CONNECTION;
const config = require('config')
const PORT = process.env.PORT || 51000;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')




// Config

app.set('view engine', 'ejs')

//Routing
app.get('/', (req, res) => {
  let theme = req.query.theme;
  if (!(theme)) {
    theme = 'light'
  }
  res.render('index', {colorTheme: theme})
})

app.get('/:json', (req, res) => {
  var result = [];
  if (req.params.json == 'lines.json') {
    const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
    client.connect(err => {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      const col = client.db("LunchSchedule").collection("LunchSched");
      const cursor = col.find();
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        result.push(doc)
      }, function() {
        client.close();
        res.json({lines: result})
      })
    });
  } else {
    res.send('No file').status(404)
  }
})


app.use("/", express.static(__dirname + "/"));


app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
