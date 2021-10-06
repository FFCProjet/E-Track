const express = require("express")

const app = express()

app.get('/', (req, res) => {
  res.sendFile('render.html',{root:__dirname});
});

app.listen(3001, () => {
  console.log('Server Express with Typescript is runing on port 3001');
});