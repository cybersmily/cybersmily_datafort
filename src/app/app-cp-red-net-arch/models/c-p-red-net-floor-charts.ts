export class CPRedNetFloorChartEntry {
  name: string;
  type: string;
  dv: number;
  cost: number;

  constructor(param?:any){
    this.name = (param && param.name)? param.name : '';
    this.type = (param && param.type)? param.type : '';
    this.dv = (param && param.dv)? param.dv : 0;
    this.cost = (param && param.cost)? param.cost : 0;
  }
}

export class CPRedNetFloorCharts {

  lobby: Array<CPRedNetFloorChartEntry>;

  floors: Array<Array<CPRedNetFloorChartEntry>>;

  constructor() {
    this.lobby = [
      new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 6, cost: 500}),
      new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 6, cost: 500}),
      new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 8, cost: 1000}),
      new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 500}),
      new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 50}),
      new CPRedNetFloorChartEntry({name: 'Anti-Program Black ICE', type: 'program', cost: 500})
    ];
    this.floors = [
      [
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Anti-Program Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: '2 Anti-Personnel Black ICE', type: 'program', cost: 100}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 50}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 50}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 6, cost: 500}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 6, cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Control Node', type: 'controller', dv: 6, cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 6, cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 100}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 100}),
        new CPRedNetFloorChartEntry({name: '1 Anti-Personnel/1 Anti-Program Black ICE', type: 'program', cost: 550}),
        new CPRedNetFloorChartEntry({name: '3 Anti-Personnel Black ICE', type: 'program', cost: 150}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 500}),
      ],
      [
        new CPRedNetFloorChartEntry({name: '2 Anti-Personnel Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: '1 Anti-Program/1 Anti-Personnel Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: '2 Anti-Personnel Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Anti-Program Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 100}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 8, cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 8, cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Control Node', type: 'controller', dv: 8, cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 8, cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 100}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: '1 Anti-Personnel/1 Anti-Program Black ICE', type: 'program', cost: 100}),
        new CPRedNetFloorChartEntry({name: '3 Anti-Personnel Black ICE', type: 'program', cost: 150}),
        new CPRedNetFloorChartEntry({name: '2 Anti-Personnel Black ICE', type: 'program', cost: 550}),
      ],
      [
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: '2 Anti-Personnel Black ICE', type: 'program', cost: 600}),
        new CPRedNetFloorChartEntry({name: '2 Anti-Personnel Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: '2 Anti-Personnel Black ICE', type: 'program', cost: 100}),
        new CPRedNetFloorChartEntry({name: 'Anti-Program Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 10, cost: 5000}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 10, cost: 5000}),
        new CPRedNetFloorChartEntry({name: 'Control Node', type: 'controller', dv: 10, cost: 5000}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 10, cost: 5000}),
        new CPRedNetFloorChartEntry({name: 'Anti-Program Black ICE', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Anti-Program Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: '2 Anti-Personnel Black ICE', type: 'program', cost: 150}),
        new CPRedNetFloorChartEntry({name: '1 Anti-Personnel/1 Anti-Program Black ICE', type: 'program', cost: 1050}),
        new CPRedNetFloorChartEntry({name: '1 Anti-Personnel Black ICE', type: 'program', cost: 1000}),
      ],
      [
        new CPRedNetFloorChartEntry({name: '3 Anti-Personnel Black ICE', type: 'program', cost: 1500}),
        new CPRedNetFloorChartEntry({name: '2 Anti-Personnel Black ICE', type: 'program', cost: 200}),
        new CPRedNetFloorChartEntry({name: '2 Anti-Personnel Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: '3 Anti-Personnel Black ICE', type: 'program', cost: 150}),
        new CPRedNetFloorChartEntry({name: '2 Anti-Program Black ICE', type: 'program', cost: 1500}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 12, cost: 10000}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 12, cost: 10000}),
        new CPRedNetFloorChartEntry({name: 'Control Node', type: 'controller', dv: 12, cost: 10000}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 12, cost: 10000}),
        new CPRedNetFloorChartEntry({name: 'Anti-Program Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: '1 Anti-Program/1 Anti-Personnel Black ICE', type: 'program', cost: 600}),
        new CPRedNetFloorChartEntry({name: 'Anti-Personnel Black ICE', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: '3 Anti-Personnel Black ICE', type: 'program', cost: 600}),
        new CPRedNetFloorChartEntry({name: '2 Anti-Program Black ICE', type: 'program', cost: 2000}),
      ]
    ];
  }

}

