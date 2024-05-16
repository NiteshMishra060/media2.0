import express from "express";
import { Login, Logout, Register } from "../controllers/user.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './videos');
//     },
//     filename: function (req, file, cb) {
//       const name = file.originalname.split('.')[0];
//       const fileExtension = file.originalname.split('.')[1];
//       const newFilename =
//         name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;
//       cb(null, newFilename);
//     },
//   });
//   const upload = multer({ storage: storage });
  
//   // Routes
//   router.post(
//     '/upload',
//     upload.single('file'),
//     async (req, res) => {
//       try {
//         const { video_name, video_type, host_name, contactNo } = req.query;
//         const videoUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;
//         const newVideo = new Video({
//           videoName: video_name,
//           videoType: video_type,
//           hostName: host_name,
//           contactNo: contactNo,
//           videoUrl: videoUrl,
//         });
//         await newVideo.save();
//         res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//       }
//     }
//   );

export default router;