var pool = require('./bd.js');


//Lista de empleados
async function getEmpleados(){
    var query = "select * from empleados ";
    var rows = await pool.query(query);
    return rows;
}

//Agregar empleado
async function insertEmpleado(obj){ //Funcion asyncronica que inserta Empleados
    try { 
        var query = "insert into empleados set ?";
        var rows = await pool.query(query,[obj]);
        return rows;
        
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Empleado por ID
async function getEmpleadoById(id){
    var query = "select * from empleados where id = ?";
    var rows = await pool.query(query,[id]);
    return rows[0];
}

//Modificar empleado
async function updateEmpleadoById(obj,id){
    try {
        var query = "update empleados set ? where id = ?";
        var rows = await pool.query(query,[obj,id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
//Eliminar empleado
async function deleteEmpleadoById(id){
    var query = "delete from empleados where id = ?";
    rows = await pool.query(query,[id]);
    return rows;
}

module.exports = {getEmpleados, insertEmpleado,updateEmpleadoById,getEmpleadoById,deleteEmpleadoById}