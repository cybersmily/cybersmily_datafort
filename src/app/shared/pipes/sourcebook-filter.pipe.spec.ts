import { SourcebookFilterPipe } from './sourcebook-filter.pipe';

describe('SourcebookFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new SourcebookFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should filter on sourcebooks', () => {
    const testArray = [
      {source: 'CP2020'},
      {source: {book: 'CP2020'}},
      {source: 'PS'},
      {source: {book: 'PS'}},
      {source: 'CHR1'},
      {source: {book: 'CHR1'}},
      {source: 'CP2020'},
      {source: {book: 'CP2020'}},
      {source: 'CHR1'},
      {source: {book: 'CHR1'}},
      {source: 'SOF'},
      {source: {book: 'SOF'}},
      {source: 'SF'},
      {source: {book: 'LU'}}
    ];
    const pipe = new SourcebookFilterPipe();
    // search on solo of fortune (SOF)
    let results = pipe.transform(testArray, 'Solo of');
    expect(results.length === 2).toBeTruthy();
    results = pipe.transform(testArray, 'Bartmoss');
    expect(results.length === 0).toBeTruthy();
    results = pipe.transform(testArray, 'Listen up');
    expect(results.length === 1).toBeTruthy();
  });
});
