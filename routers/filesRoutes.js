const router = require("express").Router();
const upload = require('../middleware/filesMiddleware')

//controllers
const {uploadFiles,getFiles} = require('../controllers/filesController')

router.post('/upload-files/:folder*?',upload.array('files', 30),uploadFiles);
router.get('/get-files/:folder*?',getFiles)


module.exports = router;
