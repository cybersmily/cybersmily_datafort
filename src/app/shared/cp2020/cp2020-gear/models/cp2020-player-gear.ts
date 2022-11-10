export class Cp2020PlayerGear {
  gear: string;
  weight: number;
  cost: number;

  constructor(para?: any) {
    this.gear = para?.gear ?? para?.name ?? '';
    this.weight = para?.weight ?? para?.wt ?? 0;
    this.cost = para?.cost ?? 0;
  }
}
