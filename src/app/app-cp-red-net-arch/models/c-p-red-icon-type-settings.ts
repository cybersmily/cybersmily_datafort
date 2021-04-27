import { iconSettings } from './icon-settings';
import { iconTypeSettings } from './icon-type-settings';



export class CPRedIconTypeSettings implements iconTypeSettings {
  password: iconSettings;
  controlNode: iconSettings;
  program: iconSettings;
  file: iconSettings;
  background: string;
  foreground: string;
  border: string;
  key: string;
  randomDifficulty: boolean;
  randomFloors: boolean;

  constructor() {
    this.key = "cs-cpred-netarch-settings";
    this.password = {color: 'darkgoldenrod', bgColor: 'lightgoldenrodyellow'};
    this.controlNode = {color: 'dimgray', bgColor: 'gainsboro'};
    this.program = {color: 'darkred', bgColor: 'lightpink'};
    this.file = {color: 'green', bgColor: 'lightgreen'};
    this.background = '#4A4848';
    this.foreground = '#DDDDDD';
    this.border = '#9DF8FF';
    this.randomDifficulty = true;
    this.randomFloors = true;
  }

  import(settings: iconTypeSettings) {
    this.password = settings.password;
    this.controlNode = settings.controlNode;
    this.program = settings.program;
    this.file = settings.file;
    this.background = settings.background;
    this.foreground = settings.foreground;
    this.border = settings.border;
    this.randomDifficulty = settings.randomDifficulty;
    this.randomFloors = settings.randomFloors;
  }

  export(): string {
    const settings: iconTypeSettings = {
      password: this.password,
      controlNode: this.controlNode,
      program: this.program,
      file: this.file,
      background: this.background,
      foreground: this.foreground,
      border: this.border,
      randomDifficulty: this.randomDifficulty,
      randomFloors: this.randomFloors
    };
    return JSON.stringify(settings);
  }
}
