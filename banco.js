module.exports = {
    saveToDatabase: saveToDatabase,
    getDatabaseData: getDatabaseData
}

const fs = require('fs');

function saveToDatabase(data){
    fs.writeFile('./db.dat', JSON.stringify(data) , function (err) {
        if (err) return console.log(err);
    });
}


function getDatabaseData(success,error){
    fs.readFile('./db.dat', function read(err, content) {
        if (err) {
            error(error);
        }
        success( content );
    });
}
  