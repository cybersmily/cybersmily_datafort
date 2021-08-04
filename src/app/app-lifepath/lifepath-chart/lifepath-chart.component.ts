import { faDice } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from '../../shared/services/dice/dice.service';
import { LifepathChart, LifepathChartSelection } from '../../shared/cp2020/cp2020-lifepath/models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-lifepath-chart',
  templateUrl: './lifepath-chart.component.html',
  styleUrls: ['./lifepath-chart.component.css']
})
export class LifepathChartComponent implements OnInit {
  faDice = faDice;

  selectedValues: any;

  @Input()
  header = '';

  @Input()
  chartData: LifepathChart[] = new Array<LifepathChart>();

  @Input()
  lifepathSource = '';

  @Output()
  valueChange = new EventEmitter();

  constructor( private diceService: DiceService) {
    this.chartData = new Array<LifepathChart>();
    this.lifepathSource = 'CP2010';
    this.selectedValues = {};
  }

  ngOnInit() {
  }

  /**
   * filterData will filter the data array based on the source.
   * If the source doesn't exist, then it defaults to CP2020
   * @param {LifepathChart} chart - Chart to check for different sources.
   * @returns {string[]} - the array of the source.
   * @memberof LifepathChartComponent
   */
  filterData(chart: LifepathChart, source: string): string[] {
    if (chart && chart.hasOwnProperty(source)) {
      return chart[source];
    }
    return chart['CP2020'];
  }

  /**
   * generateRandom will generate a random selected value for each of the categories.
   * @param {string} source - the source book chart to use.
   * @memberof LifepathChartComponent
   */
  generateRandom(source: string) {
    // for each of the dropdowns, randomly select one.
    this.chartData.forEach( (val, index) => {
      const values = this.filterData(val.options, source);
      // copy the array into the random selector.
      this.selectedValues[val.title] = this.diceService.getRandomValue(values.slice(0));
      const emitValue: LifepathChartSelection = {
        chart: this.header.toLowerCase(),
        title: val.title.toLowerCase().replace(/ /g, ''),
        value: this.selectedValues[val.title].toString()
      };
      this.valueChange.emit(emitValue);
    });
  }

  /**
   * onSelect emit the value choosen and chart.
   *
   * @memberof LifepathChartComponent
   */
  onSelected(event: any, title: string) {
    let attribute = title;
    let value = this.selectedValues[attribute];
    if (attribute && value) {
      attribute = attribute.toString().toLowerCase().replace(/ /g, '');
      value = value.toString();
      value = ( value !== '?') ? value : '';
      const emitValue: LifepathChartSelection = {chart: this.header.toLowerCase(), title: attribute, value: value};
      this.valueChange.emit(emitValue);
    }
  }
}
