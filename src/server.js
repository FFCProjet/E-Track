const express = require("express")
const app = express()
app.use(express.static(__dirname + '/../'));
app.get('/', (req, res) => {
  res.sendFile('index.html',{root:__dirname});
});


app.listen(3001, () => {
  console.log('Server Express with Typescript is runing on port 3001');
});