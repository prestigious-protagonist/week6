
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiv1Router = require('./routes/index')
const {PORT} = require("./config/server-config")
const cors = require('cors')
app.use(
    cors({
      origin: "*",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cors({
//     origin: 'http://localhost:5173'
// }))
app.use("/productService/api", apiv1Router); // All routes start from "/api"

app.get('/', (req, res) => {
    res.send("Production Service...")
})


app.listen(PORT, () => {
    console.log("On PORT : "+PORT);
})
