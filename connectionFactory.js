module.exports = {
    query           : _query
}

const mysql = require('mysql');
const pool = mysql.createPool({
                        connectionLimit : 10
                        ,host        : 'localhost'
                        ,user       :   'root'
                        ,password   :   ''
                        ,database   :   'basetestes'
                    });

function _query(sql, callback, callbackError){
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        pool.query(sql,function(error,result,fields){
                if(error) throw error;
                    callback(result);
                    connection.release();
                  //  console.log('end ....');
        });
    });
      
    
};
