// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         let destination = "";

//         // Check the file type and set the destination accordingly
//         if (file.mimetype.startsWith("image")) {
//             destination = "./upload/images";
//         } else {
//             destination = "./upload/files";
//         }

//         cb(null, destination);
//     },
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 10000000000
//     }
// });

// module.exports = {
//     storage: storage,
//     upload: upload
// };
