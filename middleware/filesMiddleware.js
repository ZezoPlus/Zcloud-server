const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let { folder = "" } = req.params;
    folder =folder.split(',') ||[]
    const sharedFolderPath = path.join(process.env.SHARED_FOLDER, ...folder);
    fs.exists(sharedFolderPath, (exists) => {
      if (exists) cb(null, sharedFolderPath);
      else cb(new Error("Shared Folder is not accessiable"));
    });
  },

  filename: (req, file, cb) => {
    // Save the file with a unique name to avoid collisions
    cb(null,file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
