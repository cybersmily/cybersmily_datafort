import { CPRedNetArchNode } from './c-p-red-net-arch-node';

describe('CPRedNetArchNode', () => {
  let node: CPRedNetArchNode;
  let nodeWithChild: CPRedNetArchNode;
  beforeEach(() => {
    node = new CPRedNetArchNode();
    node.name = 'root';
    node.id = 'root';
    nodeWithChild = new CPRedNetArchNode();
    nodeWithChild.name = 'root';
    nodeWithChild.id = 'root';
    nodeWithChild.desc = 'node with children';
    const child1 = new CPRedNetArchNode();
    child1.id = 'child1';
    const child2 = new CPRedNetArchNode();
    child2.id = 'child2';
    const child3 = new CPRedNetArchNode();
    child3.id = 'child3';
    child1.addChild(child2);
    child1.addChild(child3);
    nodeWithChild.addChild(child1);
  });

  describe('constructor()', () => {
    it('should create an instance', () => {
      expect(new CPRedNetArchNode()).toBeTruthy();
    });

    it('should create an instance', () => {
      const param = {
        name: 'test'
      };
      node = new CPRedNetArchNode(param)
      expect(node).toBeTruthy();
      expect(node.name).toEqual(param.name);
    });
  });

  describe('cost', ()=> {
    it('should calculate cost', () => {
      expect(node.cost).toEqual(0);
    });

    it('should set cost', () => {
      node.cost = 1000;
      expect(node.cost).toEqual(1000);
    });

    it('should calculate total cost', () => {
      node.cost = 1000;
      expect(node.totalCost).toEqual(1000);
    });
  });


  describe('numberOfBranches()', ()=> {
    it('should have no branches', () => {
      expect(node.numberOfBranches).toEqual(0);
    });
  });

  describe('numberOfFloors()', ()=> {
    it('should have one floor', () => {
      expect(node.numberOfFloors).toEqual(1);
    });
  });

  describe('numberOfLevels()', ()=> {
    it('should have one level', () => {
      expect(node.numberOfLevels).toEqual(1);
    });
    it('should have multiple level', () => {
      expect(nodeWithChild.numberOfLevels).toEqual(3);
    });
  });

  describe('addChild()', ()=> {
    it('should add child', () => {
      const child1 = new CPRedNetArchNode();
      child1.id = 'child1';
      node.addChild(child1);
      expect(node.branch.length).toBeGreaterThanOrEqual(1);
      expect(node.numberOfBranches).toEqual(0);
      expect(node.hasChild(child1.id)).toBeTrue();
      const child2 = new CPRedNetArchNode();
      child1.id = 'child2';
      node.addChild(child2);
      expect(node.branch.length).toBeGreaterThanOrEqual(2);
      expect(node.numberOfBranches).toEqual(1);
      expect(node.hasChild(child2.id)).toBeTrue();
    });
  });

  describe('removeChild()', ()=> {
    it('should remove second child', () => {
      const child1 = new CPRedNetArchNode();
      child1.id = 'child1';
      node.addChild(child1);
      const child2 = new CPRedNetArchNode();
      child1.id = 'child2';
      node.addChild(child2);
      node.removeChild(1);
      expect(node.branch.length).toEqual(1);
      expect(node.numberOfBranches).toEqual(0);
      expect(node.hasChild(child1.id)).toBeFalse();

    });
  });

  describe('insertChild()', ()=> {
    it('should insert child', () => {
      const child1 = new CPRedNetArchNode();
      child1.id = 'newChild';
      nodeWithChild.insertChild('child3', child1);
      expect(nodeWithChild.hasChild(child1.id)).toBeTrue();
      expect(nodeWithChild.numberOfLevels).toEqual(4);
      expect(nodeWithChild.numberOfFloors).toEqual(5);
    });
    it('should insert child to root', () => {
      const child1 = new CPRedNetArchNode();
      child1.id = 'newChild';
      nodeWithChild.insertChild('root', child1);
      expect(nodeWithChild.hasChild(child1.id)).toBeTrue();
      expect(nodeWithChild.numberOfLevels).toEqual(3);
      expect(nodeWithChild.numberOfFloors).toEqual(5);
    });
  });

  describe('deleteChild()', ()=> {
    it('should delete child3', () => {
      nodeWithChild.deleteChild('child3');
      expect(nodeWithChild.numberOfFloors).toEqual(3);
      expect(nodeWithChild.numberOfLevels).toEqual(3);
      expect(nodeWithChild.hasChild('child3')).toBeFalse();
    });
    it('should delete child1and all its children', () => {
      nodeWithChild.deleteChild('child1');
      expect(nodeWithChild.numberOfFloors).toEqual(1);
      expect(nodeWithChild.numberOfLevels).toEqual(1);
      expect(nodeWithChild.hasChild('child1')).toBeFalse();
      expect(nodeWithChild.hasChild('child2')).toBeFalse();
      expect(nodeWithChild.hasChild('child3')).toBeFalse();
    });
  });

  describe('hasChild()', ()=> {
    it('should have root id', () => {
      expect(nodeWithChild.hasChild('root')).toBeTrue();
      expect(nodeWithChild.hasChild('notRoot')).toBeFalse();
    });

    it('should have child1 id', () => {
      expect(nodeWithChild.hasChild('child1')).toBeTrue();
      expect(nodeWithChild.hasChild('notRoot')).toBeFalse();
    });

    it('should have child3 id', () => {
      expect(nodeWithChild.hasChild('child3')).toBeTrue();
      expect(nodeWithChild.hasChild('notRoot')).toBeFalse();
    });

  });

  describe('update()', ()=> {
    it('should update node with nodeWithChild with new description', () => {
      node.update(nodeWithChild);
      expect(node.desc).toEqual(nodeWithChild.desc);
    });

    it('should update node child with nodeWithChild', () => {
      const child1 = new CPRedNetArchNode();
      child1.id = 'newRoot';
      nodeWithChild.id = 'newRoot';
      node.addChild(child1);
      node.update(nodeWithChild);
      expect(node.branch[0].desc).toEqual(nodeWithChild.desc);
    });
  });

  describe('export', ()=> {

    beforeEach(() => {
      node.addChild(new CPRedNetArchNode({name:'child1'}));
    });

    it('should export to node', () => {
      const newNode = node.export();
      expect(newNode.name).toEqual(node.name);
      expect(newNode.level).toEqual(node.level);
      expect(newNode.branch.length).toEqual(1);
    });

    it('should export to JSON', () => {
      const newNode = node.exportAsJSONString();
      expect(typeof newNode).toEqual('string');
      expect(newNode.indexOf(node.name)).toBeGreaterThanOrEqual(0);
      expect(newNode.indexOf(node.branch[0].name)).toBeGreaterThanOrEqual(0);
    });
  });

});
