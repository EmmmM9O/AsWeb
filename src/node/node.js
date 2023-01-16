const express=require('express')
const app = express.Router();
const mysql=require('mysql');
const fs = require('fs');
const jwt = require('jsonwebtoken')
const sqlstring=require('sqlstring');
const configs = require('../config');
const MySqlConfig=configs.MySqlConfig;
function connectionIbjFn() {
    return mysql.createConnection(MySqlConfig);
}
app.get('/user/login',(req,res)=>{
    let name=res.query.name;
})
app.get('/test',(req,res)=>{
    res.send('test is ok');
})
module.exports=app;