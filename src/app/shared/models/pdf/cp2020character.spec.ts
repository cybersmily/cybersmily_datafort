import { jsPDF } from 'jspdf';
import { Cp2020characterToPDF } from './cp2020characterToPDF';
import { Cp2020PlayerCharacter } from '../cp2020character';

describe('Cp2020characterToPDF', () => {
  let charPDF: Cp2020characterToPDF;

  beforeEach( () => {
    charPDF = new Cp2020characterToPDF();
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
