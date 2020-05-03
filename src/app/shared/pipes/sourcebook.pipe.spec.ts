import { SourcebookPipe } from './sourcebook.pipe';

describe('SourcebookPipe', () => {
  it('create an instance', () => {
    const pipe = new SourcebookPipe();
    expect(pipe).toBeTruthy();
  });

  it('should find CP2020', () => {
    const pipe = new SourcebookPipe();
    const results = pipe.transform('CP2020');
    expect(results.toLowerCase().startsWith('cyberpunk ')).toBeTruthy();
  });
});
