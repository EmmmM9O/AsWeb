const express = require('express');
const app = express();
const mysql = require('mysql');
const fs=require('fs');
const sqlstring=require('sqlstring')
const {Email,MySqlConfig}= require('./config');
function connectionIbjFn() {
    return mysql.createConnection(MySqlConfig);
}
app.get('/user/query', (req, res) => {
    var connection = connectionIbjFn();
    connection.connect();
    var sql = 'select * from login_query';
    connection.query(sql, (err, result) => {
        res.send(result)
    });
    connection.end()
})
app.get('/user/insert', (req, res) => {
    var mail =sqlstring.escape(req.query.mail);
    var nickname =sqlstring.escape(req.query.nickname);
    var password=sqlstring.escape(req.query.password);
    var connection = connectionIbjFn();
    connection.connect();
    var sql = 'insert into login_mail(id,mail,nickname,password,create_time) values(null,"' + mail + '","' + nickname +'","'+password+ '","now()")';
    connection.query(sql, (err, result) => {
        if(err){
            res.send({result:false,err:err})
        }
        else res.send({result:true,err:null})
    });
    connection.end()
})
app.get('/user/search-key', (req, res) => {
    var key =  sqlstring.escape(req.query.mail);
    var connection = connectionIbjFn();
    connection.connect();
    var sql = 'select nickname from login_mail where mail like ' + '"' + key + '"';
    connection.query(sql, (err, result) => {
        res.send(result)
    });
    connection.end()
})
app.get('/user/write',(req,res)=>{
    var mail=req.query.mail;
    var vccode = req.query.vccode;
    var time=req.query.time;
    fs.writeFile('/tmp/'+time+"-mail", mail, 'utf-8', (error) => {
        if (error) {
            console.log("写入失败", error);
        } else {
            console.log("写入成功");
        }
    });
    setTimeout(()=>{
        fs.unlink("/tmp/"+time+"-mail", (err)=>{});
    },60*60*5);
})
app.listen(4000, function () {
    console.log('4000，mysql，中间件已经执行:http://localhost:4000');
})