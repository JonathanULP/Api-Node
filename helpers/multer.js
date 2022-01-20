const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination:'assets/uploads',
    filename: (req,file,cb) => {
        cb(null, path.extname(file.originalname));
    }
})

export default multer({ storage });