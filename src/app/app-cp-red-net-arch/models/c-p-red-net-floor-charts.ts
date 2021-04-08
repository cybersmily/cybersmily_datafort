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
      new CPRedNetFloorChartEntry({name: 'Skunk', type: 'program', cost: 500}),
      new CPRedNetFloorChartEntry({name: 'Wisp', type: 'program', cost: 50}),
      new CPRedNetFloorChartEntry({name: 'Killer', type: 'program', cost: 500})
    ];
    this.floors = [
      [
        new CPRedNetFloorChartEntry({name: 'Hellhound', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Sabertooth', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: '2 Raven', type: 'program', cost: 200}),
        new CPRedNetFloorChartEntry({name: 'Hellhound', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Wisp', type: 'program', cost: 50}),
        new CPRedNetFloorChartEntry({name: 'Raven', type: 'program', cost: 50}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 6, cost: 500}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 6, cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Control Node', type: 'controller', dv: 6, cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 6, cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Skunk', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Asp', type: 'program', cost: 100}),
        new CPRedNetFloorChartEntry({name: 'Scorpion', type: 'program', cost: 100}),
        new CPRedNetFloorChartEntry({name: 'Killer and Skunk', type: 'program', cost: 1100}),
        new CPRedNetFloorChartEntry({name: '3 Wisp', type: 'program', cost: 450}),
        new CPRedNetFloorChartEntry({name: 'Liche', type: 'program', cost: 500}),
      ],
      [
        new CPRedNetFloorChartEntry({name: '2 Hellhound', type: 'program', cost: 2000}),
        new CPRedNetFloorChartEntry({name: 'Hellhound and Killer', type: 'program', cost: 2000}),
        new CPRedNetFloorChartEntry({name: '2 Skunk', type: 'program', cost: 2000}),
        new CPRedNetFloorChartEntry({name: 'Sabertooth', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Scorpion', type: 'program', cost: 100}),
        new CPRedNetFloorChartEntry({name: 'Hellhound', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 8, cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 8, cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Control Node', type: 'controller', dv: 8, cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 8, cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Asp', type: 'program', cost: 100}),
        new CPRedNetFloorChartEntry({name: 'Killer', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Liche', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Asp', type: 'program', cost: 100}),
        new CPRedNetFloorChartEntry({name: '3 Raven', type: 'program', cost: 450}),
        new CPRedNetFloorChartEntry({name: 'Liche and Raven', type: 'program', cost: 1100}),
      ],
      [
        new CPRedNetFloorChartEntry({name: 'Kraken', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Hellhound and Scorpion', type: 'program', cost: 1200}),
        new CPRedNetFloorChartEntry({name: 'Hellhound and Killer', type: 'program', cost: 2000}),
        new CPRedNetFloorChartEntry({name: '2 Raven', type: 'program', cost: 200}),
        new CPRedNetFloorChartEntry({name: 'Sabertooth', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Hellhound', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 10, cost: 5000}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 10, cost: 5000}),
        new CPRedNetFloorChartEntry({name: 'Control Node', type: 'controller', dv: 10, cost: 5000}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 10, cost: 5000}),
        new CPRedNetFloorChartEntry({name: 'Killer', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Liche', type: 'program', cost: 500}),
        new CPRedNetFloorChartEntry({name: 'Dragon', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Asp and Raven', type: 'program', cost: 300}),
        new CPRedNetFloorChartEntry({name: 'Dragon and Wisp', type: 'program', cost: 2100}),
        new CPRedNetFloorChartEntry({name: 'Giant', type: 'program', cost: 1000}),
      ],
      [
        new CPRedNetFloorChartEntry({name: '3 Hellhound', type: 'program', cost: 4500}),
        new CPRedNetFloorChartEntry({name: '2 Asp', type: 'program', cost: 400}),
        new CPRedNetFloorChartEntry({name: 'Hellhound and Liche', type: 'program', cost: 2000}),
        new CPRedNetFloorChartEntry({name: '3 Wisp', type: 'program', cost: 450}),
        new CPRedNetFloorChartEntry({name: 'Hellhound and Sabertooth', type: 'program', cost: 3000}),
        new CPRedNetFloorChartEntry({name: 'Kraken', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 12, cost: 10000}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 12, cost: 10000}),
        new CPRedNetFloorChartEntry({name: 'Control Node', type: 'controller', dv: 12, cost: 10000}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 12, cost: 10000}),
        new CPRedNetFloorChartEntry({name: 'Giant', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Dragon', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Killer and Scorpion', type: 'program', cost: 1200}),
        new CPRedNetFloorChartEntry({name: 'Kraken', type: 'program', cost: 1000}),
        new CPRedNetFloorChartEntry({name: 'Raven, Wisp, and Hellhound', type: 'program', cost: 1800}),
        new CPRedNetFloorChartEntry({name: '2 Dragon', type: 'program', cost: 4000}),
      ]
    ];
  }

}

