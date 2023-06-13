import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';


export default function handler(req, res) {
  const doc = new PDFDocument({
    size: 'A4' // Define o tamanho da página como A4
  });

  // Criar cabeçalho
  const headerText = 'Secretaria Municipal de Saúde';
  const headerHeightPercentage = 5;
  const headerPaddingPercentage = 1;
  const cornerRadius = 10;
  const imagePath = path.join(process.cwd(), 'public', 'images', 'LogoTFD.png');
  const imagePath2 = path.join(process.cwd(), 'public', 'images', 'brasao.png');


    // Coordenadas e dimensões da imagem
    const imageX = 492;
    const imageY = 18;
    const imageWidth = 100;
    const imageHeight = 50;
  

  const headerHeight = (doc.page.height * headerHeightPercentage) / 100;
  const headerPadding = (doc.page.height * headerPaddingPercentage) / 100;

  const headerX = (doc.page.width ) / 2;
  const headerY = 23;

  // Desenhar a borda do cabeçalho com cantos arredondados
  doc
  .lineWidth(1.2)
  .roundedRect(
    16,
    headerY - headerPadding,
    566,
    60,
    cornerRadius
  ).stroke();

  //imagens cabeçalho
  doc.image(imagePath, imageX, imageY, { width: imageWidth, height: imageHeight });
  doc.image(imagePath2, 25, 20, { width: 50, height: 55 });


  // Adicionar texto do cabeçalho
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .moveUp(3.5)
    .text('SECRETARIA MUNICIPAL DE SAÚDE DE MARABÁ', { align: 'center',  lineGap: 100 });

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .text('TRATAMENTO FORA DO DOMICÍLIO - TFD',70,38, { align: 'center' });

  doc
  .font('Helvetica')
  .fontSize(7)
  .text('AGRÓPOLIS DO INCRA, SN - AMAPA MARABA / PA',70,50, { align: 'center' });

  doc
  .font('Helvetica')
  .fontSize(7)
  .text('CNPJ: 11.111.111/0001-11 INSC. EST: ISENTO',70,61, { align: 'center' });


  //margens
  doc.roundedRect(
    187,
    90,
    230,
    25,
    cornerRadius
  ).stroke();

  //margens nome paciente
  doc.roundedRect(
    16,
    130,
    347,
    25,
    cornerRadius
  ).stroke();


    //margens sexo
    doc.roundedRect(
      370,
      130,
      100,
      25,
      cornerRadius
    ).stroke();  

    //margens data nascimento
    doc.roundedRect(
      476,
      130,
      80,
      25,
      cornerRadius
    ).stroke();  
    
    //margens idade
    doc.roundedRect(
      562,
      130,
      30,
      25,
      cornerRadius
    ).stroke();  
    
        
  
  doc
  .font('Helvetica-Bold')
  .fontSize(12)
  .fill('black') // Define a cor do texto
  .text('PRONTO ATENDIMENTO',70,98, { align: 'center' });

  doc
  .font('Helvetica')
  .fontSize(12)
  .text(`Nome do paciente`, 70,400,  { align: 'center' });

  res.setHeader('Content-Type','application/pdf');
  doc.pipe(res);
  doc.end();
}