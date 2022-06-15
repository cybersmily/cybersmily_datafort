import { ValueRange, ValueWeight } from './../../../models';

export interface ClubChartData {
  clubsCharts: {
    types: Array<ValueWeight<string>>;
    themes: Array<ValueWeight<string>>;
    music: Array<ValueWeight<string>>;
    gimmicks: Array<ValueWeight<string>>;
    capacity: Array<ValueWeight<string>>;
    occupancy: Array<ValueWeight<string>>;
    wait: Array<ValueWeight<string>>;
    regulars: Array<ValueWeight<string>>;
    crowd: Array<ValueWeight<string>>;
    attitude: Array<ValueWeight<string>>;
    dresscode: Array<ValueWeight<string>>;
    membersonly: Array<ValueWeight<string>>;
    privacy: Array<ValueWeight<string>>;
    ownership: Array<ValueWeight<string>>;
    security: Array<ValueWeight<string>>;
  };
  clubbers: {
    ages: Array<ValueWeight<ValueRange>>;
    styles: Array<ValueWeight<string>>;
    stat: Array<ValueWeight<number>>;
    skill: Array<ValueWeight<number>>;
    haircolor: Array<ValueWeight<string>>;
    hairstyle: Array<ValueWeight<string>>;
    cyberware: Array<ValueWeight<string>>;
  };
}
