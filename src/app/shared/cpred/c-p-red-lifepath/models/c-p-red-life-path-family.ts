export class CPRedLifePathFamily {
  background: string;
  childhoodEnvironment: string;
  familyCrisis: string;

  constructor(param?:any) {
    this.background = param?param.background:'';
    this.childhoodEnvironment = param?param.childhoodEnvironment:'';
    this.familyCrisis = param?param.familyCrisis:'';
  }

}
