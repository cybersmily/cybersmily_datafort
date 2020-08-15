import { ContainsPipe } from './contains.pipe';

describe('ContainsPipe', () => {
  let pipe: ContainsPipe;
  let testArray: Array<{name: string}>;

  beforeEach(() => {
    pipe = new ContainsPipe();
    testArray = [
      { name: 'test'},
      { name: 'cat'},
      { name: 'category'},
      { name: 'test2'}
    ];
  });

  afterEach(() => {
    pipe = null;
    testArray = null;

  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter', () => {
    let results = pipe.transform(testArray, 'name', 'dog');
    expect(results.length).toEqual(0);
    results = pipe.transform(testArray, 'name', 'test');
    expect(results.length).toEqual(2);
    results = pipe.transform(testArray, 'name', 'tEsT');
    expect(results.length).toEqual(2);
    results = pipe.transform(testArray, 'name', 'gory');
    expect(results.length).toEqual(1);
  });
  it('should not filter', () => {
    let results = pipe.transform(testArray, 'dog', 'dog');
    expect(results.length).toEqual(4);
    results = pipe.transform(testArray, 'test', 'test');
    expect(results.length).toEqual(4);
    results = pipe.transform(testArray, undefined, null);
    expect(results.length).toEqual(4);
  });
});
