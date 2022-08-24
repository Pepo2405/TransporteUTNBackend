var pool = require('./bd'); //lamando datos BD
var md5 = require('md5');
const { get } = require('../routes');

async function getUserByUsernameAndPassword(user, password) {
    try{
        var query = 'select * from usuarios where user = ? and password = ? limit 1';
        var rows = await pool.query(query, [user,md5(password)]);
        return rows[0];
    }
    catch(error){
        console.log(error)
    };
}
async function insertarUsuario(user,password){
    try { 
        var obj = {
            user:user,
            password:password
        };
        pool.query("insert into usuarios set ?", [obj]).then(function(resultados){
            console.log(resultados);
        });
        
    } catch (error) {
        
    }
}

module.exports = {getUserByUsernameAndPassword,insertarUsuario}