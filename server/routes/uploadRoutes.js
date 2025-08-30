import express from 'express';
import multer from 'multer';
import Document from '../models/Document.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), async (req, res) => {
  const newDocument = new Document({
    name: req.file.originalname,
    filePath: req.file.path,
  });

  await newDocument.save();
  res.json({ success: true, documentId: newDocument._id });
});

router.get('/convert/:id', async (req, res) => {
  const document = await Document.findById(req.params.id);
  if (!document) return res.status(404).send('Document not found');

  document.converted = true;
  await document.save();
  res.json({ success: true, converted: true });
});

export default router;
