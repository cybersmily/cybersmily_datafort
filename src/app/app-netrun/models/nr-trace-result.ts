export class NRTraceResult {
  dump: boolean;
  result: string;
  succeed: boolean;

  constructor( succeeded: boolean, result: string, dumped: boolean ) {
    this.succeed = succeeded;
    this.dump = dumped;
    this.result = result;
  }
}
