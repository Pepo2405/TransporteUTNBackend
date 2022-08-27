var express = require("express");
var router = express.Router();
var novedadesModel = require("./models/novedadesModel");
var EmpleadosModel = require("./models/empleadosModel"); 
var cloudinary = require("cloudinary").v2;
var nodemailer = require("nodemailer");


//Novedades
router.get("/novedades", async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();

  novedades = novedades.map((novedad) => {
    if (novedad.img_id) {
      const image = cloudinary.url(novedad.img_id, {
        width: 500,
        height: 300,
        crop: "fill",
      });
      return { ...novedad, image };
    } else {
      return { ...novedad, image: "" };
    }
  });

  res.json(novedades);
});

//Listado de Empleados

router.get("/empleados",async function (req,res,next){
  var empleados = await EmpleadosModel.getEmpleados();
  empleados = empleados.map((empleado)=>{
    if(empleado.img_id){
      const image = cloudinary.url(empleado.img_id);
      console.log(image)
      return {...empleado,image}
    } else {

      console.log("salio")
      return {...empleado,image:""}
    }
  });

  res.json(empleados)

});


//Envio de correo electrónico
router.post("/contacto", async (req, res) => {
  const mail = {
    to: "ignacioniglesias@gmail.com",
    subject: "Contacto web",
    html: `${req.body.nombre}  se contacto a traves de la web y quiere
      mas informacion a este correo ${req.body.email} <br> Ademas, hizo el siguiente comentario: ${req.body.mensaje} <br> Su telefono es ${req.body.telefono}`,
  };
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail(mail);
  res.status(201).json({ 
    error: false,
  msg:'Mensaje enviado' });
});

module.exports = router;
