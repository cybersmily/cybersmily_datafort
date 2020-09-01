import { OrderbyPipe } from './orderby.pipe';

describe('OrderbyPipe', () => {
  let pipe: OrderbyPipe;
  let emptyArray: Array<string>;
  let stringArray: Array<string>;
  let numberArray: Array<number>;
  let objArray: Array<any>;

  beforeEach(() => {
    pipe = new OrderbyPipe();
    stringArray = ['test', 'hello', 'world'];
    numberArray = [5, 2, 3, 7, 8, 1, 4, 9, 6];
    objArray = [
      { name: 'test8', id: 3 },
      { name: 'test2', id: 2 },
      { name: 'test5', id: 9 },
      { name: 'test4', id: 1 },
      { name: 'test6', id: 5 },
      { name: 'test1', id: 4 },
      { name: 'test9', id: 6 },
      { name: 'test3', id: 7 },
      { name: 'test7', id: 8 },
    ];
    emptyArray = [];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return untouched array', () => {
    let arr = pipe.transform(stringArray);
    expect(arr[2]).toEqual(stringArray[2]);
    arr = pipe.transform(numberArray);
    expect(arr[2]).toEqual(numberArray[2]);
    arr = pipe.transform(emptyArray);
    expect(arr.length).toEqual(0);
  });

  it('should return sorted non-object array ascending', () => {
    let arr = pipe.transform(stringArray);
    expect(arr[0]).toEqual('hello');
    expect(arr[2]).toEqual('world');

    arr = pipe.transform(numberArray);
    expect(arr[0]).toEqual(1);
    expect(arr[1]).toEqual(2);
    expect(arr[7]).toEqual(8);
    expect(arr[8]).toEqual(9);
  });


  it('should return sorted non-object array decending', () => {
    let arr = pipe.transform(stringArray, true);
    expect(arr[2]).toEqual('hello');
    expect(arr[0]).toEqual('world');

    arr = pipe.transform(numberArray, true);
    expect(arr[8]).toEqual(1);
    expect(arr[7]).toEqual(2);
    expect(arr[1]).toEqual(8);
    expect(arr[0]).toEqual(9);
  });
  describe('Sort object array', () => {
    describe('Ascending', () => {
      it('should sort on name', () => {
        const arr = pipe.transform(objArray, 'name');
        expect(arr[0].name).toEqual('test1');
        expect(arr[0].id).toEqual(4);
        expect(arr[3].name).toEqual('test4');
        expect(arr[4].name).toEqual('test5');
        expect(arr[5].name).toEqual('test6');
        expect(arr[8].name).toEqual('test9');
        expect(arr[8].id).toEqual(6);
      });
      it('should sort on id', () => {
        const arr = pipe.transform(objArray, 'id');
        expect(arr[0].name).toEqual('test4');
        expect(arr[0].id).toEqual(1);
        expect(arr[3].id).toEqual(4);
        expect(arr[4].id).toEqual(5);
        expect(arr[5].id).toEqual(6);
        expect(arr[8].name).toEqual('test5');
        expect(arr[8].id).toEqual(9);
      });
    });
    describe('Descending', () => {

      it('should sort on name', () => {
        const arr = pipe.transform(objArray, 'name', true);
        expect(arr[8].name).toEqual('test1');
        expect(arr[8].id).toEqual(4);
        expect(arr[5].name).toEqual('test4');
        expect(arr[4].name).toEqual('test5');
        expect(arr[3].name).toEqual('test6');
        expect(arr[0].name).toEqual('test9');
        expect(arr[0].id).toEqual(6);
      });
      it('should sort on id', () => {
        const arr = pipe.transform(objArray, 'id', true);
        expect(arr[8].name).toEqual('test4');
        expect(arr[8].id).toEqual(1);
        expect(arr[5].id).toEqual(4);
        expect(arr[4].id).toEqual(5);
        expect(arr[3].id).toEqual(6);
        expect(arr[0].name).toEqual('test5');
        expect(arr[0].id).toEqual(9);
      });

    });

  });



});
