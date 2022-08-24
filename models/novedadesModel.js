var pool = require('./bd.js');

async function getNovedades(){
    var query = "select * from novedades ";
    var rows = await pool.query(query);
    return rows;
}

async function insertNovedad(obj){ //Funcion asyncronica que inserta Novedades
    try { 
        var query = "insert into novedades set ?";
        var rows = await pool.query(query,[obj]);
        return rows;
        
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteNovedadById(id){
    var query = "delete from novedades where id = ?";
    rows = await pool.query(query,[id]);
    return rows;
}

async function getNovedadesById(id){
    var query = "select * from novedades where id = ?";
    var rows = await pool.query(query,[id]);
    return rows[0];
}



async function updateNovedadById(obj,id){
    try {
        var query = "update novedades set ? where id = ?";
        var rows = await pool.query(query,[obj,id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



module.exports = {getNovedades, insertNovedad, deleteNovedadById, getNovedadesById,updateNovedadById};