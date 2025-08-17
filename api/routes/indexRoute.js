import express from 'express'
import { summarize } from '../controllers/indexController.js';
import multer from 'multer';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/summarize',  upload.single("file"), summarize)


export default router;