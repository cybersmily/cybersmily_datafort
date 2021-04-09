export class CPRedNetFloorChartEntry {
  name: string;
  type: string;
  dv: number;
  cost: number;
  desc: string;

  constructor(param?:any){
    this.name = (param && param.name)? param.name : '';
    this.type = (param && param.type)? param.type : '';
    this.dv = (param && param.dv)? param.dv : 0;
    this.cost = (param && param.cost)? param.cost : 0;
    this.desc = (param && param.desc)? param.desc : '';
  }
}

export class CPRedNetFloorCharts {

  lobby: Array<CPRedNetFloorChartEntry>;

  floors: Array<Array<CPRedNetFloorChartEntry>>;

  constructor() {
    this.lobby = [
      new CPRedNetFloorChartEntry({name: 'File', type: 'file', desc: 'Cyberpunk Red Core Rulebook pg 217', dv: 6, cost: 500}),
      new CPRedNetFloorChartEntry({name: 'Password', type: 'password', desc: 'Cyberpunk Red Core Rulebook pg 217', dv: 6, cost: 500}),
      new CPRedNetFloorChartEntry({name: 'Password', type: 'password', desc: 'Cyberpunk Red Core Rulebook pg 217', dv: 8, cost: 1000}),
      new CPRedNetFloorChartEntry({name: 'Skunk', type: 'program', desc: 'Cyberpunk Red Core Rulebook pg 207', cost: 500}),
      new CPRedNetFloorChartEntry({name: 'Wisp', type: 'program', desc: 'Cyberpunk Red Core Rulebook pg 207', cost: 50}),
      new CPRedNetFloorChartEntry({name: 'Killer', type: 'program', desc: 'Cyberpunk Red Core Rulebook pg 207', cost: 500})
    ];
    this.floors = [
      [
        new CPRedNetFloorChartEntry({name: 'Hellhound', type: 'program', cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 206'}),
        new CPRedNetFloorChartEntry({name: 'Sabertooth', type: 'program', cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: '2xRaven', type: 'program', cost: 200, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Hellhound', type: 'program', cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 206'}),
        new CPRedNetFloorChartEntry({name: 'Wisp', type: 'program', cost: 50, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Raven', type: 'program', cost: 50, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 6, cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 6, cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 6, cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'Control Node', type: 'controller', dv: 6, cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 6, cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'Skunk', type: 'program', cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Asp', type: 'program', cost: 100, desc: 'Cyberpunk Red Core Rulebook pg 206'}),
        new CPRedNetFloorChartEntry({name: 'Scorpion', type: 'program', cost: 100, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Killer Skunk', type: 'program', cost: 1100, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: '3xWisp', type: 'program', cost: 450, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Liche', type: 'program', cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
      ],
      [
        new CPRedNetFloorChartEntry({name: '2xHellhound', type: 'program', cost: 2000, desc: 'Cyberpunk Red Core Rulebook pg 206'}),
        new CPRedNetFloorChartEntry({name: 'Hellhound Killer', type: 'program', cost: 2000, desc: 'Cyberpunk Red Core Rulebook pg 206,207'}),
        new CPRedNetFloorChartEntry({name: '2xSkunk', type: 'program', cost: 2000, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Sabertooth', type: 'program', cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Scorpion', type: 'program', cost: 100, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Hellhound', type: 'program', cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 206'}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 8, cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 8, cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 6, cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'Control Node', type: 'controller', dv: 8, cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 8, cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'Asp', type: 'program', cost: 100, desc: 'Cyberpunk Red Core Rulebook pg 206'}),
        new CPRedNetFloorChartEntry({name: 'Killer', type: 'program', cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Liche', type: 'program', cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Asp', type: 'program', cost: 100, desc: 'Cyberpunk Red Core Rulebook pg 206'}),
        new CPRedNetFloorChartEntry({name: '3xRaven', type: 'program', cost: 450, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Liche Raven', type: 'program', cost: 1100, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
      ],
      [
        new CPRedNetFloorChartEntry({name: 'Kraken', type: 'program', cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Hellhound Scorpion', type: 'program', cost: 1200, desc: 'Cyberpunk Red Core Rulebook pg 206,207'}),
        new CPRedNetFloorChartEntry({name: 'Hellhound Killer', type: 'program', cost: 2000, desc: 'Cyberpunk Red Core Rulebook pg 206,207'}),
        new CPRedNetFloorChartEntry({name: '2xRaven', type: 'program', cost: 200, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Sabertooth', type: 'program', cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Hellhound', type: 'program', cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 206'}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 10, cost: 5000, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 10, cost: 5000, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 6, cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'Control Node', type: 'controller', dv: 10, cost: 5000, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 10, cost: 5000, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'Killer', type: 'program', cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Liche', type: 'program', cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Dragon', type: 'program', cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Asp Raven', type: 'program', cost: 300, desc: 'Cyberpunk Red Core Rulebook pg 206,207'}),
        new CPRedNetFloorChartEntry({name: 'Dragon Wisp', type: 'program', cost: 2100, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Giant', type: 'program', cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 206'}),
      ],
      [
        new CPRedNetFloorChartEntry({name: '3xHellhound', type: 'program', cost: 4500, desc: 'Cyberpunk Red Core Rulebook pg 206'}),
        new CPRedNetFloorChartEntry({name: '2xAsp', type: 'program', cost: 400, desc: 'Cyberpunk Red Core Rulebook pg 206'}),
        new CPRedNetFloorChartEntry({name: 'Hellhound Liche', type: 'program', cost: 2000, desc: 'Cyberpunk Red Core Rulebook pg 206,207'}),
        new CPRedNetFloorChartEntry({name: '3xWisp', type: 'program', cost: 450, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Hellhound Sabertooth', type: 'program', cost: 3000, desc: 'Cyberpunk Red Core Rulebook pg 206,207'}),
        new CPRedNetFloorChartEntry({name: 'Kraken', type: 'program', cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 12, cost: 10000, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 12, cost: 10000, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'File', type: 'file', dv: 6, cost: 500, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'Control Node', type: 'controller', dv: 12, cost: 10000, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'Password', type: 'password', dv: 12, cost: 10000, desc: 'Cyberpunk Red Core Rulebook pg 217'}),
        new CPRedNetFloorChartEntry({name: 'Giant', type: 'program', cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 206'}),
        new CPRedNetFloorChartEntry({name: 'Dragon', type: 'program', cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Killer Scorpion', type: 'program', cost: 1200, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Kraken', type: 'program', cost: 1000, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
        new CPRedNetFloorChartEntry({name: 'Raven Wisp Hellhound', type: 'program', cost: 1800, desc: 'Cyberpunk Red Core Rulebook pg 206,207'}),
        new CPRedNetFloorChartEntry({name: '2xDragon', type: 'program', cost: 4000, desc: 'Cyberpunk Red Core Rulebook pg 207'}),
      ]
    ];
  }

}

