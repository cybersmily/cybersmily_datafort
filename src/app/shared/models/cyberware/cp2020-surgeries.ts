import { Cp2020Surgery } from "./cp2020-surgery";

export class Cp2020Surgeries {
  static list: Array<Cp2020Surgery> = [
    {
      name: '-',
      code: '',
      cost: 0,
      damage: '',
      requried: '',
      diff: 0,
      timeInHours: 0
    },
    {
      name: 'Negligible',
      code: 'N',
      cost: 0,
      damage: '1',
      requried: 'Mall clinic or bodyshop',
      diff: 10,
      timeInHours: 1
    },
    {
      name: 'Minor',
      code: 'M',
      cost: 500,
      damage: '1d6+1',
      requried: 'Med center or ripperdoc clinic',
      diff: 15,
      timeInHours: 2
    },
    {
      name: 'Major',
      code: 'MA',
      cost: 1500,
      damage: '2d6+1',
      requried: 'Full hospital with surgery center',
      diff: 20,
      timeInHours: 4
    },
    {
      name: 'Critical',
      code: 'CR',
      cost: 2500,
      damage: '3d6+1',
      requried: 'Full hospital with surgery center',
      diff: 25,
      timeInHours: 6
    }

  ];
}
