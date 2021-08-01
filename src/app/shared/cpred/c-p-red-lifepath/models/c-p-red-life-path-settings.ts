export class CPRedLifePathSettings {
  minFriends: number;
  maxFriends: number;
  friendsDice: string;
  minEnemies: number;
  maxEnemies: number;
  enemyDice: string;
  minLovers: number;
  maxLovers: number;
  loversDice: string;
  defaultRole: string;
  defaultSystem: string;

  constructor() {
    this.friendsDice = '1d10-7';
    this.enemyDice = '1d10-7';
    this.loversDice = '1d10-7';
    this.defaultRole = 'Exec';
    this.defaultSystem = 'jumpstart';

  }
}
