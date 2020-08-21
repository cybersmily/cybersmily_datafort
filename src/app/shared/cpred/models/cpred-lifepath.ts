export class CPRedLifepath {
  background: string;
  motivation: string;
  goals: string;
  friends: string[];
  enemies: string[];
  personality: string;
  romance: string;

  constructor() {
    this.background = '';
    this.motivation = '';
    this.goals = '';
    this.friends = [];
    this.enemies = [];
    this.personality = '';
    this.romance = '';
  }

  print(): string {
    let output = '';
    output += 'LIFEPATH\r\n';
    output += `  Background  - ${this.background}\r\n`;
    output += '\r\n';
    output += `  Motivation  - ${this.motivation}\r\n`;
    output += '\r\n';
    output += `  Goals       - ${this.goals}\r\n`;
    output += '\r\n';
    output += '  Friends\r\n';
    this.friends.forEach( e => {
      output += `              - ${e}\r\n`;
    });
    output += '\r\n';
    output += '  Enemies\r\n';
    this.enemies.forEach( e => {
      output += `              - ${e}\r\n`;
    });
    output += '\r\n';
    output += `  Romance     - ${this.romance}\r\n`;
    output += '\r\n';
    output += `  Personality - ${this.personality}\r\n`;
    output += '\r\n';
    return output;
  }
}
