var express = require('express');
var router = express.Router();
var novedadesModel = require("../models/novedadesModel");
var util = require('util');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/',async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  novedades = novedades.map(novedad =>{
    if(novedad.img_id){
        const image = cloudinary.image(novedad.img_id,{ 
            width: 300,
            height:200,
            crop:'fill'
        });
        return {...novedad,image}
    } else{
        return{...novedad,
                image:''}
    }

  });

  res.render('noticias', {
     layout:'layout',
      title: ' Noticias',
      novedades });
});


module.exports = router;
