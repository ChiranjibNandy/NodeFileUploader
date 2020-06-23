var express = require("express");
var fs = require("fs");
var router = express.Router();

router.post("/", function(req, res, next) {
    console.log("In route handler");
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
      const file = req.files.file;

      console.log('file being uploaded ', file);

    
      file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        fs.readFile(`${__dirname}/client/public/uploads/${file.name}`, 'utf8', (error, data) => {
            if (error) {
              console.error(error);
              return res.status(500).send(error);
            }
            res.json({fileName: file.name, fileData: data});
          });
      });
});

module.exports = router;