import { HasValuePipe } from './has-value.pipe';

describe('HasValuePipe', () => {
  it('create an instance', () => {
    const pipe = new HasValuePipe();
    expect(pipe).toBeTruthy();
  });
});
