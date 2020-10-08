const express=require('express');
const app=express();
const bodyParser=require('body-parser');//bodyparse
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const MongoClient=require('mongodb').MongoClient;
let server=require('./server');//connecting server file for AWT
let config=require('./config');
let middleware=require('./middleware');
const response=require('express');

const url='mongodb://127.0.0.1:27017';
const dbName='hospvin'; //connecting to mongodb
let db

MongoClient.connect(url,{useUnifiedTopology:true},(err,client)=>{
    if (err) return console.log(err);
    db=client.db(dbName);
    console.log(`Connected Mongodb: ${url}`);
    console.log(`Database: ${dbName}`);
})

//read hospital details
app.get("/hospital",middleware.checkToken,(req,res)=>{
    console.log("Hospital Details");
    var details=db.collection("hospital").find().toArray().then(result=>res.json(result));
});

//read ventilator details
app.get("/ventilators",middleware.checkToken,(req,res)=>{
    console.log("Ventilator Details");
    var details=db.collection("ventilators").find().toArray().then(result=>res.json(result));
});

//search ventilators by status 
app.post("/searchventilatorbystatus",middleware.checkToken,(req,res)=>{
    var status=req.body.Status;
    console.log(status);
    var vdetails=db.collection("ventilators").find({"Status":status}).toArray().then(result=>res.json(result));
});

//search ventilators by hospital name
app.post("/searchventilatorbystatus",middleware.checkToken,(req,res)=>{
    var hname=req.query.hname;
    console.log(hname);
    var vdetails=db.collection("ventilators").find({"name":new RegExp(name,"i")}).toArray().then(result=>res.json(result));
});

//search hospital by name
app.post("/searchhospitalbyname",middleware.checkToken,(req,res)=>{
    var Name=req.body.Name;
    console.log(Name);
    var vdetails=db.collection("hospital").find({"Name":new RegExp(Name,"i")}).toArray().then(result=>res.json(result));
});

//update ventilator details
app.put("/ventilatordetails",middleware.checkToken,(req,res)=>{
    var V_ID={V_ID:req.body.V_ID};
    console.log(V_ID);
    var updateventilators={$set:{Status:req.body.Status}};
    db.collection("ventilators").updateOne(update,updateventilators,function(err,result){
        res.json("1 document updated");
        if(err) throw err;
    })
});

//add ventilator
app.post("/addventilator",middleware.checkToken,(req,res)=>{
    
    var hId=req.body.hId;
    var vId=req.body.vId;
    var status=req.body.status;
    var name=req.body.name;

    var item=
    {
        H_ID:hId, V_ID:vId, Status:status, Name:name
    };
    db.collection("ventilators").insertOne(item,function(result){
       res.json("item inserted");
    });
});

//delete ventilator by Id
app.delete("/deleteventilatorbtid",middleware.checkToken,(res,req)=>{
    var query=req.query.V_ID;
    console.log(query);
    var myquery={V_ID: query};
    db.collection("ventilators").deleteOne(item,function(err,obj){
        if(err) throw err;
     });
});

app.listen(8000);