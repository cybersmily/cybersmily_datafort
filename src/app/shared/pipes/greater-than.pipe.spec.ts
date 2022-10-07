import { GreaterThanPipe } from './greater-than.pipe';

describe('GreaterThanPipe', () => {
  it('create an instance', () => {
    const pipe = new GreaterThanPipe();
    expect(pipe).toBeTruthy();
  });
});
