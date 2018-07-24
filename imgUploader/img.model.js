var mongoose = require('mongoose');
var ShortUniqueId = require('short-unique-id');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');


const img_sch = new mongoose.Schema({
    name: String,
    type: String,
    url: String,
    folder: String
});

const folder_sch = new mongoose.Schema({
    name: String
});

var Folder_m = mongoose.model('Folder_m', folder_sch)
var Img_m = mongoose.model('Img_m', img_sch)
var uuid = new ShortUniqueId();

// methods for folder

exports.getFolders = function (req, res) {
   Folder_m.find({}, function (err, doc) {
       if (err) {
           console.log(err);
           return res.sendStatus(500);
       }
       res.send(doc);
   })
}
exports.addFolder = function (req, res) {
    var newFolder = {
        name: req.body.name
    }
    Folder_m.create(newFolder, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.editFolder = function (req, res) {

}
exports.deleteFolder = function (req, res) {
  if (req.params.id && req.params.name) {

      fse.remove(path.join(__dirname,'../..','images',req.params.name), err => {
          if (err) return console.error(err)
      })

      Img_m.remove({ folder: req.params.name}, function(err, response) {});

      Folder_m.deleteOne({_id: req.params.id}, function (err) {
          if (err) {
              console.log(err + 1);
              return res.sendStatus(500);
          }
          res.sendStatus(200);
      })
  }
}

// methods for img

exports.getImgsByFolderFromDB = function (req, res) {
     Img_m.find({folder: req.params.folder}, function (err, doc) {
         if (err) {
             console.log(err);
             return res.sendStatus(500);
         }
         res.send(doc);
     })
}

exports.uploadImg = function (req, res) {
    if (req.files.image) {
        var file = req.files.image;
        var imgName = `${uuid.randomUUID(8)}${file.name}`;
        var uploadpath = path.join(__dirname,'../..','images',req.params.folder);
        var newImg = {
            name: imgName,
            type: file.mimetype,
            url: req.protocol + '://' + req.get('host') +'/img/'+ req.params.folder + '/' + imgName,
            folder: req.params.folder
        }

        fse.ensureDir(uploadpath, err => {
            // console.log(err) // => null
            // dir has now been created, including the directory it is to be placed in
        })

        file.mv(uploadpath + '/' + imgName, (err) => {
            if (err) {
                console.log("File Upload Failed", file.name, err);
                res.send("Error Occured!")
            } else {
                Img_m.create(newImg, function (err, doc) {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    }
                    res.send(doc);
                })
            }
        });

    } else {
        res.send("No File selected !");
        res.end();
    };
}

exports.deleteImg = function (req, res) {
    if (req.params.name && req.params.folder) {
        Img_m.deleteOne({name: req.params.name}, function (err) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            fs.unlink(path.join(__dirname,'../..','images',req.params.folder,req.params.name), function (error) {
                if (error) {
                    throw error;
                }
            });
            res.sendStatus(200);
        })
    }
}

exports.getImageByName = function (req, res) {
   if (req.params.name && req.params.folder){
    res.sendFile(path.join(__dirname,'../..','images',req.params.folder,req.params.name));
   }
}