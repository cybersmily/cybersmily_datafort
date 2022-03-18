import { MonthArrayPipe } from './month-array.pipe';

describe('MonthArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new MonthArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
