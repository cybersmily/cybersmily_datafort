import { CPRedLifepathJumpStart } from '../../shared/cpred/c-p-red-lifepath/models';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'cs-temp-generator-lifepath',
    templateUrl: './temp-generator-lifepath.component.html',
    styleUrls: ['./temp-generator-lifepath.component.css'],
    standalone: false
})
export class TempGeneratorLifepathComponent implements OnInit, OnChanges {

  @Input()
  lifepath: CPRedLifepathJumpStart;

  background: Array<string>;
  motivation: Array<string>;
  goals: Array<string>;
  friends: Array<string>;
  enemies: Array<string>;
  romance: Array<string>;
  personality: Array<string>;

  constructor() { }

  ngOnInit() {
    this.background = new Array<string>();
    this.motivation = new Array<string>();
    this.goals = new Array<string>();
    this.friends = new Array<string>();
    this.enemies = new Array<string>();
    this.romance = new Array<string>();
    this.personality = new Array<string>();
  }

  ngOnChanges() {
    this.background = this.getTextLine(this.lifepath.background);
    this.motivation = this.getTextLine(this.lifepath.motivation);
    this.goals = this.getTextLine(this.lifepath.goals);
    this.friends = this.lifepath.friends;
    this.enemies = this.lifepath.enemies;
    this.romance = this.getTextLine(this.lifepath.romance);
    this.personality = this.getTextLine(this.lifepath.personality);
  }


  /**
   * separates the text lines of the lifepath property so that
   * it can fit in the text  element of the svg.
   * @param {string} value - text to parse
   * @returns {string[]} - lines of text to display.
   * @memberof TempGeneratorLifepathComponent
   */
  getTextLine(value: string): string[] {
    const text = new Array<string>();
    const words = value.split(' ');
    let line = '';
    words.forEach( (word, i) => {
      const newline =  line + word;
      if (newline.length > 43  ) {
        text.push(line.toString());
        if (i === (words.length - 1)) {
          text.push(word);
        }
        line = '';
      } else {
        line = newline + ' ';
        if (i === (words.length - 1)) {
          text.push(newline);
        }
      }
    });
    return text;
  }
}
