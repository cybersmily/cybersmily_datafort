import { CelsiusPipe } from './celsius.pipe';

describe('CelsiusPipe', () => {
  it('create an instance', () => {
    const pipe = new CelsiusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should not convert object', () => {
    const pipe = new CelsiusPipe();
    let temp = pipe.transform({name: 'cybersmily'});
    expect(temp).toEqual(0);
  });

  it('should not convert boolean', () => {
    const pipe = new CelsiusPipe();
    let temp = pipe.transform(false);
    expect(temp).toEqual(0);
  });

  it('should not convert non-number string', () => {
    const pipe = new CelsiusPipe();
    let temp = pipe.transform('cybersmily');
    expect(temp).toEqual(0);
  });

  it('should convert string number', () => {
    const pipe = new CelsiusPipe();
    let temp = pipe.transform('32');
    expect(temp).toEqual(0);
    temp = pipe.transform('100');
    expect(temp).toEqual(38);
    temp = pipe.transform('-100');
    expect(temp).toEqual(-73);
  });

  it('should convert number', () => {
    const pipe = new CelsiusPipe();
    let temp = pipe.transform(32);
    expect(temp).toEqual(0);
    temp = pipe.transform(100);
    expect(temp).toEqual(38);
    temp = pipe.transform(-100);
    expect(temp).toEqual(-73);
  });


});
