export interface cyberdeckSettings {
  useQNR: boolean;
}

export class Cp2020CyberdeckSettings implements cyberdeckSettings {
  useQNR: boolean;

  constructor(param?: any) {
    this.useQNR = param?.useQNR ?? false;
  }
}
