import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter', () => {
    const pipe = new FilterPipe();
    const stringArray = [
      { name: 'test'},
      { name: 'cat'},
      { name: 'category'},
      { name: 'test2'},
      { name: 'test3'},
      { name: { name: 'test'}},
      { name: { name: 'cat'}},
      { name: { name: 'dog'}},
      { name: { name: 'category'}}
    ];
    let results = pipe.transform(stringArray, 'name', 'test');
    expect(results.length === 3).toBeTruthy(results);
    results = pipe.transform(stringArray, 'name', 'gory');
    expect(results.length === 0).toBeTruthy(results);
    results = pipe.transform(stringArray, 'name.name', 'dog');
    expect(results.length === 1).toBeTruthy(results);
    results = pipe.transform(stringArray, 'name.name', 'cat');
    expect(results.length === 2).toBeTruthy(results);
    results = pipe.transform(stringArray, 'name.name', '');
    expect(results.length === 9).toBeTruthy(results);
    results = pipe.transform(stringArray, '', 'test');
    expect(results.length === 9).toBeTruthy(results);
  });
});
