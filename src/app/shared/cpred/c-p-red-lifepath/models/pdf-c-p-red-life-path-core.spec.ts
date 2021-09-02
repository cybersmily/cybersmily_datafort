import { CPRedLifePathCore } from './c-p-red-life-path-core';
import { jsPDF } from 'jspdf';
import { PDFCPRedLifePathCore } from './pdf-c-p-red-life-path-core';

describe('PDFCPRedLifePathCore', () => {
  describe('creatdPDF()', () => {
    it('should create PDF', () => {
      let doc = new jsPDF();
      const lifepath = new CPRedLifePathCore();
      doc = PDFCPRedLifePathCore
          .creatdPDF(doc,
            lifepath, // lifepath
            10, // leftMargin
            10, // top
            8, // lineheight
            400, // pageHeight
            250, // pageWidth
            'arial', // font
            8 );
      expect(doc).toBeTruthy();
    });
  });
});
