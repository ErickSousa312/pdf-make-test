import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';


export default function handler(req, res) {
  const doc = new PDFDocument();

  doc.fontSize(24).text('Hello, world!', 100, 100);

  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);
  doc.end();
}