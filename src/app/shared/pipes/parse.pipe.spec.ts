import { ParsePipe } from './parse.pipe';

describe('ParsePipe', () => {
  it('create an instance', () => {
    const pipe = new ParsePipe();
    expect(pipe).toBeTruthy();
  });

  it('create an instance', () => {
    const expectValue = 'this & that';
    let test = expectValue;
    const pipe = new ParsePipe();
    let results = pipe.transform(test);
    expect(results === expectValue).toBeTruthy();
    test = 'this \& that';
    results = pipe.transform(test);
    expect(results === expectValue).toBeTruthy();
    test = 'this \\& that';
    results = pipe.transform(test);
    expect(results === expectValue).toBeTruthy();
  });
});
