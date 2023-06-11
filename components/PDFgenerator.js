import axios from 'axios';

const generatePDF = async()=>{
    try {
            const response = await axios.get('/api/pdf', {
                responseType: 'blob', // Especifica o tipo de resposta como blob (Binary Large Object)
            });       

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

            saveAs(pdfBlob, 'arquivo.pdf');
      
            console.log('PDF gerado e baixado com sucesso!');

    } catch (error) {
        console.error('Erro ao gerar e baixar o PDF: ', error);
    }
}

export default generatePDF