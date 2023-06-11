import React, { useState } from 'react';
import axios from 'axios';

const PdfPage = () => {
  const [pdfData, setPdfData] = useState(null);

  const fetchPdf = async () => {
    try {
      const response = await axios.get('/api/pdf', {
        responseType: 'blob',
      });
      const pdfUrl = URL.createObjectURL(response.data);
      setPdfData(pdfUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfData;
    link.download = 'output.pdf';
    //link.target = '_blank'; *caso queira q ele abra em outro
    link.click();
  };

  return (
    <div>
      <button onClick={fetchPdf}>Gerar PDF</button>
      {pdfData && (
        <div>
          <iframe src={pdfData} style={{ width: '100%', height: '500px' }} />
          <button onClick={handleDownload}>Baixar PDF</button>
        </div>
      )}
    </div>
  );
};

export default PdfPage;
