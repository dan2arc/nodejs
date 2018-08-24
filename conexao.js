module.exports.conectaBanco = _conectaBanco;

function _conectaBanco(sql){

var mysql = require('mysql');
var connection = mysql.createConnection({
    host        : 'localhost'
    ,user       :   'root'
    ,password   :   ''
    ,database   :   'basetestes'
});

connection.connect(function (err){
    if (err){
        console.error('error connect'+ err.stack);

    }else{
        console.log('ok');
        
    }

});
connection.query(sql
,function(error,result,fields){
    if(error) throw error;
        console.log(result);
        callback(result);
        }
)




connection.end();
};