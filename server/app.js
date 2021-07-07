const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

// const atlasPass=odinswolf;  

const mongoUri ="mongodb+srv://funky:odinswolf@cluster0.kuip9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.get('/',(req,res)=>{
    res.send('welcome to server');
})

app.listen(3000,()=>{
    console.log('server is running');
})



// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://funky:<password>@cluster0.kuip9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
