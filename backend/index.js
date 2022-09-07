const connectToMongo =require("./db");
const express=require("express")
var cors=require('cors')
const port=5000;

const app=express()
app.use(cors())


const bodyParser = require("body-parser")
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

//auth
app.use(express.json());

//routes
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/todo/',require('./routes/todo'));
app.use("/api/doctor",require("./routes/Doctor"))
app.use("/api/hospital",require("./routes/Hospital"))

app.get("/",(req,res)=>{
    res.send("Start thse server on localhost: "+port)
})

app.listen(port,(err)=>{
if(err)throw err;
console.log(`server listen on http://localhost:${port}`)
})