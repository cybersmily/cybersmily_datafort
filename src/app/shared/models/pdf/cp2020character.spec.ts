import { Cp2020DeckmanagerPdfSectionService } from './../../cp2020/cp2020-netrun-gear/services/cp2020-deckmanager-pdf-section/cp2020-deckmanager-pdf-section.service';
import { Cp2020ArmorPDFSectionService } from './../../cp2020/cp2020-armor/services/cp2020-armor-pdf-section/cp2020-armor-pdf-section.service';
import { jsPDF } from 'jspdf';
import { Cp2020characterToPDF } from './cp2020characterToPDF';
import { Cp2020PlayerCharacter } from '../cp2020character';
import { Cp2020ContactSectionPdfService } from '../../cp2020/cp2020-contacts/services/cp2020-contact-section-pdf/cp2020-contact-section-pdf.service';

describe('Cp2020characterToPDF', () => {
  let charPDF: Cp2020characterToPDF;
  let armorPDF = new Cp2020ArmorPDFSectionService();
  let deckmanagerPDF = new Cp2020DeckmanagerPdfSectionService();
  let contactPDF = new Cp2020ContactSectionPdfService();

  beforeEach(() => {
    charPDF = new Cp2020characterToPDF(armorPDF, deckmanagerPDF, contactPDF);
    charPDF['_character'] = new Cp2020PlayerCharacter();
  });

  it('should create an instance', () => {
    expect(charPDF).toBeTruthy();
  });

  it('should create an jsPDF doc', () => {
    const doc: jsPDF = charPDF.setupDoc();
    expect(doc).toBeTruthy();
  });

  it('should create first page', () => {
    const doc: jsPDF = charPDF.setupDoc();
    charPDF.createFirstPage(doc);
    expect(doc).toBeTruthy();
  });

  it('should create second page', () => {
    const doc: jsPDF = charPDF.setupDoc();
    charPDF.createSecondPage(doc);
    expect(doc).toBeTruthy();
  });

  it('should create third page', () => {
    const doc: jsPDF = charPDF.setupDoc();
    charPDF.createThirdPage(doc);
    expect(doc).toBeTruthy();
  });
});
