import { NrProgram } from './../netrun/nr-program';
import { Cp2020ProgramList } from './../netrun/cp2020-program-list';
import { jsPDF } from 'jspdf';
import { DeckManagerToPdf } from './deck-manager-to-pdf';
import { Cp2020DeckManager, Cp2020NetrunDeck } from '../netrun';

describe('DeckManagerToPdf', () => {

  let jspdf: jsPDF;
  let deckManager: Cp2020DeckManager;

  beforeEach(() => {
    jspdf = new jsPDF();
    deckManager = new Cp2020DeckManager();
    deckManager.deck = new Cp2020NetrunDeck();
    deckManager.deck.name = 'test';
    deckManager.deck.speed = 2;
    deckManager.programList = new Cp2020ProgramList();
    deckManager.programList.add({
      name: 'Program1',
      class: { name: 'Test', diff: 10, description: '' },
      options: [],
      strength: 3,
      icon: '',
      description: '',
      cost: 100,
      diff: 10,
      mu: 10
    });
  });

  it('should create an jsPDF', () => {
    const doc = DeckManagerToPdf['setupDoc']();
    expect(doc).toBeTruthy();
  });

  it('should create a Header', () => {
    const doc = DeckManagerToPdf['setupDoc']();
    const line = DeckManagerToPdf['addHeader'](doc, 'test', 10);
    expect(doc).toBeTruthy();
    expect(line).toEqual(30);
  });

  it('should add Deck', () => {
    const doc = DeckManagerToPdf['setupDoc']();
    const line = DeckManagerToPdf['addDeck'](doc, deckManager.deck, 10);
    expect(doc).toBeTruthy();
    expect(line).toBeGreaterThan(10);
  });

  it('should add Program List', () => {
    const doc = DeckManagerToPdf['setupDoc']();
    let line = DeckManagerToPdf['addProgramList'](doc, deckManager.programList, 10);
    expect(doc).toBeTruthy();
    expect(line).toEqual(10);
    deckManager.programList.add({
      name: 'Program2',
      class: { name: 'Test', diff: 10, description: '' },
      options: [],
      strength: 3,
      icon: '',
      description: '',
      cost: 100,
      diff: 10,
      mu: 10
    });
    line = DeckManagerToPdf['addProgramList'](doc, deckManager.programList, 10);
    expect(doc).toBeTruthy();
    expect(line).toBeGreaterThan(10);
  });

  it('should add Program', () => {
    const doc = DeckManagerToPdf['setupDoc']();
    const line = DeckManagerToPdf['addProgram'](doc, deckManager.programList.programs[0], 10, 10);
    expect(doc).toBeTruthy();
    expect(line).toBeGreaterThan(10);
  });

  afterEach(() => {
    jspdf = null;
    deckManager = null;
  });
});
