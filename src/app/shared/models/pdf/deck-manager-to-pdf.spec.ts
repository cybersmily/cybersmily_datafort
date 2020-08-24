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
  });

  it('should create an instance', () => {
    expect(new DeckManagerToPdf()).toBeTruthy();
  });


  afterEach( () => {
    jspdf = null;
    deckManager = null;
  });
});
