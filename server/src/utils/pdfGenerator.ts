import PDFDocument from 'pdfkit';

interface CertificateData {
    userName: string;
    courseName: string;
    ceHours: number;
    completionDate: Date;
    score: number;
}

export const generatePDF = async (data: CertificateData): Promise<Buffer> => {
    return new Promise((resolve) => {
        const doc = new PDFDocument({
            size: 'LETTER',
            layout: 'landscape'
        });

        // Collect the PDF data chunks
        const chunks: Buffer[] = [];
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));

        // Add content to the PDF
        doc.fontSize(25)
           .text('Certificate of Completion', { align: 'center' });

        doc.moveDown();
        doc.fontSize(15)
           .text(`This is to certify that`, { align: 'center' });
        
        doc.moveDown();
        doc.fontSize(20)
           .text(data.userName, { align: 'center' });

        doc.moveDown();
        doc.fontSize(15)
           .text(`has successfully completed`, { align: 'center' });

        doc.moveDown();
        doc.fontSize(20)
           .text(data.courseName, { align: 'center' });

        doc.moveDown();
        doc.fontSize(15)
           .text(`with a score of ${data.score}%`, { align: 'center' });

        doc.moveDown();
        doc.text(`CE Hours Earned: ${data.ceHours}`, { align: 'center' });

        doc.moveDown();
        doc.text(`Completion Date: ${data.completionDate.toLocaleDateString()}`, { align: 'center' });

        // Finalize the PDF
        doc.end();
    });
}; 