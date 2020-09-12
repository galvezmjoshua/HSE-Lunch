const express = require('express')
const app = express()
const os = require('os')


// Config
const config = require('config')
const PORT = config.get('PORT')
app.set('view engine', 'ejs')

//Routing
app.get('/', (req, res) => {
  let theme = req.query.theme;
  if (!(theme)) {
    theme = 'light'
  }
    res.render('index', { colorTheme: theme })
})


app.use("/", express.static(__dirname + "/"));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
