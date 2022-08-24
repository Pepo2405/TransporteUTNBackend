var express = require("express");
var router = express.Router();

var novedadesModel = require("../../models/novedadesModel");
var util = require("util");
var cloudinary = require("cloudinary").v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get("/", async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();

  novedades = novedades.map((novedad) => {
    if (novedad.img_id) {
      const image = cloudinary.image(novedad.img_id, {
        width: 70,
        height: 70,
        crop: "fill",
      });
      return { ...novedad, image };
    } else {
      return { ...novedad, image: "" };
    }
  });

  res.render("admin/novedades", {
    layout: "admin/layout",
    usuario: req.session.nombre,
    novedades,
  });
});

router.get("/agregar", (req, res, next) => {
  res.render("admin/agregar", {
    layout: "admin/layout",
  }); //Cierra render
}); //Cierra get

router.get("/eliminar/:id", async function (req, res, next) {
  var id = req.params.id;
  let novedad = await novedadesModel.getNovedadesById(id);
  await novedadesModel.deleteNovedadById(id);
  console.log("La novedad: "+novedad);
  console.log(novedad.img_id)
  if(novedad.img_id){await (destroy(novedad.img_id))};
  res.redirect("/admin/novedades");

});

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
      await novedadesModel.insertNovedad({
        ...req.body, //Titulo subtitulo cuerpo
        img_id,
      }); //Imagen o imagen vacia
      res.redirect("/admin/novedades");
    } else {
      console.log("Hay campos sin llenar");
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

router.get("/modificar/:id", async (req, res, next) => {
  let id = req.params.id;
  let novedad = await novedadesModel.getNovedadesById(id);
  res.render("admin/modificar", {
    layout: "admin/layout",
    novedad,
  });
});

router.post("/modificar", async (req, res, next) => {
  try {
    console.log("Aca esta la id del reqbody"+req.body.img_original)
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
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      img_id,
    };
    await novedadesModel.updateNovedadById(obj, req.body.id);
    res.redirect("/admin/novedades");
  } catch (error) {
    res.render("admin/modificar", {
      layout: "admin/layout",
      error: true,
      message: "No se pudo realizar la modificacion",
    });
    console.log(error);
  }
});

module.exports = router;
