import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';


export default function handler(req, res) {
  const doc = new PDFDocument();

  // Criar cabeçalho
  const headerText = 'Secretaria Municipal de Saúde';
  const headerHeightPercentage = 5;
  const headerPaddingPercentage = 1;
  const cornerRadius = 10;
  const imagePath = path.join(process.cwd(), 'public', 'images', 'LogoTFD.png');

  // Coordenadas e dimensões da imagem TF
  const imageX = 465;
  const imageY = 26;
  const imageWidth = 110;
  const imageHeight = 55;

  const headerHeight = (doc.page.height * headerHeightPercentage) / 100;
  const headerPadding = (doc.page.height * headerPaddingPercentage) / 100;

  const headerX = (doc.page.width) / 2;
  const headerY = 23;

  // Desenhar a borda do cabeçalho com cantos arredondados
  doc
    .roundedRect(
      16,
      headerY - headerPadding,
      580,
      80,
      cornerRadius
    ).stroke();

  //image TFD
  doc
    .image(imagePath, imageX, imageY, { width: imageWidth, height: imageHeight });

  // Adicionar texto do cabeçalho
  doc
    .fontSize(16)
    .text(headerText, 70, 35, { align: 'center' });

  // Adicionar conteúdo do PDF
  doc
    .fontSize(12)
    .text('Conteúdo do documento...', 70, 150, { align: 'center' });

  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);
  doc.end();
}