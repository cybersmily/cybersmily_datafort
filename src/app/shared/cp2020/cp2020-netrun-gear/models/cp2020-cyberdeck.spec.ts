import { Cyberdeck } from './cyberdeck';
import { Cp2020Cyberdeck } from './cp2020-cyberdeck';

describe('Cp2020Cyberdeck', () => {
  let deck: Cp2020Cyberdeck;
  let testNrDeck: Cyberdeck;

  beforeEach(() => {
    deck = new Cp2020Cyberdeck();
    testNrDeck = {
      name: 'test',
      type: { name: 'cellular', description: '', cost: 1000 },
      dataWall: 5,
      speed: 2,
      totalMU: 10,
      doubleMu: false,
      options: [
        {
          name: 'testOption1',
          description: 'Test deck option',
          cost: 500,
          mods: { speed: 1 },
          source: { book: 'test', page: 2 },
        },
        {
          name: 'testOption2',
          description: 'Test deck option',
          cost: 100,
          mods: { speed: 1, mu: -1 },
          source: { book: 'test', page: 2 },
        },
        {
          name: 'testOption3',
          description: 'Test deck option',
          cost: '*1',
          mods: { speed: 1, mu: 3 },
          source: { book: 'test', page: 2 },
        }
      ],
      description: 'test deck',
    };
  });
  afterEach(() => {
    deck = null;
    testNrDeck = null;
  });

  it('should create an instance', () => {
    expect(deck).toBeTruthy();
  });

  it('should create an instance for a NrDeck', () => {
    deck = new Cp2020Cyberdeck(testNrDeck);
    expect(deck).toBeTruthy();
    expect(testNrDeck).toBeTruthy();
    expect(deck.name).toEqual(testNrDeck.name);
    expect(deck.type.name).toEqual(testNrDeck.type.name);
    expect(deck.dataWall).toEqual(testNrDeck.dataWall);
    expect(deck.speed).toEqual(testNrDeck.speed);
    expect(deck.doubleMu).toEqual(testNrDeck.doubleMu);
    expect(deck.description).toEqual(testNrDeck.description);
    expect(deck.options.length).toEqual(testNrDeck.options.length);
    expect(deck.options[0].name).toEqual(testNrDeck.options[0].name);
    expect(deck.options[1].name).toEqual(testNrDeck.options[1].name);
    expect(deck.options[2].name).toEqual(testNrDeck.options[2].name);

    expect(deck.totalMU).toEqual(testNrDeck.totalMU + 2); // options should increase the mu
  });

  it('should mu calculate', () => {
    expect(deck.totalMU).toEqual(10);
    deck.mu = 13;
    expect(deck.totalMU).toEqual(13);
    deck.mu = -12;
    expect(deck.totalMU).toEqual(0);
    deck = new Cp2020Cyberdeck(testNrDeck);
    expect(deck.totalMU).toEqual(12);
    deck.doubleMu = true;
    expect(deck.totalMU).toEqual(22);
  });

  it('should calculate cost', () => {
    expect(deck.cost).toEqual(0);
    deck = new Cp2020Cyberdeck(testNrDeck);
    expect(deck.cost).toEqual(16600);
    deck.doubleMu = true;
    expect(deck.cost).toEqual(26600);
    deck.updateOption({
      name: 'testOption3',
      description: 'Test deck option',
      cost: '*1',
      mods: { speed: 1, mu: 3 },
      source: { book: 'test', page: 2 },
      count: 0
    });
    expect(deck.cost).toEqual(13600);
  });

  it('should use mu', () => {
    expect(deck.usedMu).toEqual(0);
    for (let i = 0; i < 4; i++) {
      deck.programs.push({
        name: `test${i}`,
        mu: i,
        cost: i,
        description: 'test program',
        class: { name: 'class', diff: 10, description: 'test class' },
        diff: i,
        icon: 'test icon',
        strength: i,
        options: []
      });
    }
    expect(deck.usedMu).toEqual(6);
  });

  it('should calculate speed', () => {
    expect(deck.maxSpeed).toBe(5);
    deck.updateOption({
      name: 'testOption3',
      description: 'Test deck option',
      cost: '*1',
      mods: { maxSpeed: -1, mu: 3 },
      source: { book: 'test', page: 2 },
      count: 2,
    });
    expect(deck.maxSpeed).toBe(3);
  });
});
