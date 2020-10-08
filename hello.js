/*var express=require('express');
var app=express();

const MongoClient=require('mongodb').MongoClient;

const url="mongodb://127.0.0.1:27017";
const dbName="hospitalInventory";
 let db
 MongoClient.connect(url,(err,client)=>
 {
     if(err) return console.log(err);
     db=client.db(dbName);
     console.log('connected database: ${url}');
     console.log

 }*/

 var http=require("http");
 http.createServer(function(req,res)
 {
     res.end("Hello world in browser");
 }).listen(3000);
 console.log("hello in console");
