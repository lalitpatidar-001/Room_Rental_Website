const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define the destination folder for uploaded files
        console.log("called multer")

        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Define the filename for uploaded files
        console.log("called multer")
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Initialize Multer with the configured storage
const uploadImages = multer({ storage: storage });


module.exports = uploadImages