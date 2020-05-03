import { ContainsPipe } from './contains.pipe';
import { faAmericanSignLanguageInterpreting } from '@fortawesome/free-solid-svg-icons';

describe('ContainsPipe', () => {
  it('create an instance', () => {
    const pipe = new ContainsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter', () => {
    const pipe = new ContainsPipe();
    const stringArray = [
      { name: 'test'},
      { name: 'cat'},
      { name: 'category'},
      { name: 'test2'}
    ];

    let results = pipe.transform(stringArray, 'name', 'dog');
    expect(results.length === 0).toBeTruthy(results);
    results = pipe.transform(stringArray, 'name', 'test');
    expect(results.length === 2).toBeTruthy(results);
    results = pipe.transform(stringArray, 'name', 'gory');
    expect(results.length === 1).toBeTruthy(results);
  });
});
