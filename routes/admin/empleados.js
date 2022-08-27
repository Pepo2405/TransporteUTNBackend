var express = require("express");
var router = express.Router();

var empleadosModel = require("../../models/empleadosModel");
var util = require("util");
var cloudinary = require("cloudinary").v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get("/", async function (req, res, next) {
  var empleados = await empleadosModel.getEmpleados();

  empleados = empleados.map((empleado) => {
    if (empleado.img_id) {
      const image = cloudinary.url(empleado.img_id, {
        width: 70,
        height: 70,
        crop: "fill",
      });
      return { ...empleado, image };
    } else {
      return { ...empleado, image: "" };
    }
  });

  res.render("admin/empleados", {
    layout: "admin/layout",
    usuario: req.session.nombre,
    empleados,
  });
});

//Ruta para agregar empleado
router.get("/agregar", (req, res, next) => {
    res.render("admin/agregarEmpleado", {
      layout: "admin/layout",
      a: "Nombre",
      tipo:"Empleado"
    }); //Cierra render
  }); //Cierra get

  //Formulario para agregar empleado
  router.post("/agregar", async function (req, res, next) {
    try {
      var img_id = "";
      if (req.files && Object.keys(req.files).length > 0) {
        image = req.files.image;
        img_id = (await uploader(image.tempFilePath)).public_id;
      }
  
      if (
        req.body.titulo != "" &&
        req.body.subtitulo != "" &&
        req.body.cuerpo != ""
      ) {
        await empleadosModel.insertEmpleado({
          ...req.body, //Nombre cargo introduccion
          img_id,
        }); //Foto
        res.redirect("/admin/empleados");
      } else {
        console.log("Favor de llenar todos los campos*");
        res.render("admin/agregar", {
          layout: "admin/layout",
          error: true,
          message: "Favor de llenar todos los datos",
        });
      }
    } catch (error) {
      console.log(error);
      res.render("admin/layout", {
        layout: "admin/layout",
        error: true,
        message: "No se cargo la novedad",
      });
    }
  });

  //Modificar empleado

  router.get("/modificar/:id", async (req, res, next) => {
    let id = req.params.id;
    let novedad = await empleadosModel.getEmpleadoById(id);
    res.render("admin/modificarEmpleado", {
      layout: "admin/layout",
      novedad,
    });
  });

  router.post("/modificar", async (req, res, next) => {
    try {
      let img_id = req.body.img_original;
      let borrar_img_vieja = false;
      if (req.body.img_delete === "1") {
        img_id = null;
        borrar_img_vieja = true;
      } else {
        if (req.files && Object.keys(req.files).length > 0) {
          image = req.files.image;
          img_id = (await uploader(image.tempFilePath)).public_id;
          borrar_img_vieja = true;
        }
      }
      if (borrar_img_vieja === true && req.body.img_original) {
        await destroy(req.body.img_original);
      }
  
      let obj = {
        nombre: req.body.nombre,
        puesto: req.body.puesto,
        datos: req.body.datos,
        img_id,
      };
      await empleadosModel.updateEmpleadoById(obj, req.body.id);
      res.redirect("/admin/empleados");
    } catch (error) {
      res.render("admin/modificar", {
        layout: "admin/layout",
        error: true,
        message: "No se pudo realizar la modificacion",
      });
      console.log(error);
    }
  });



  //Eliminar empleados
  router.get("/eliminar/:id", async function (req, res, next) {
    var id = req.params.id;
    let empleado = await empleadosModel.getEmpleadoById(id);
    await empleadosModel.deleteEmpleadoById(id);
    console.log("El empleado: "+empleado);
    console.log(empleado.img_id)
    if(empleado.img_id){await (destroy(empleado.img_id))};
    res.redirect("/admin/empleados");
  });
module.exports = router;