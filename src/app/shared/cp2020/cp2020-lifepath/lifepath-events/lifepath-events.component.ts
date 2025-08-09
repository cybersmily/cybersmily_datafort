import { faDice } from '@fortawesome/free-solid-svg-icons';
import { LifeEventsGeneratorService } from './../services';
import { LifepathEventsList } from './../models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'cs-lifepath-events',
    templateUrl: './lifepath-events.component.html',
    styleUrls: ['./lifepath-events.component.css'],
    standalone: false
})
export class LifepathEventsComponent implements OnInit {
  faDice = faDice;

  @Input()
  lifepathSource: string;

  @Output()
  generateEvents: EventEmitter<LifepathEventsList> = new EventEmitter<LifepathEventsList>();

  levents: LifepathEventsList = new LifepathEventsList();
  hasEventful = false;
  InputYear: string;

  constructor(private lifeEventGenService: LifeEventsGeneratorService) { }

  ngOnInit() {
  }


  /**
   * generate the list of life events, starting from age 16.
   *
   * @memberof LifepathEventsComponent
   */
  generateLifeEvents() {
    this.lifeEventGenService
    .GenerateLifeEvents(this.lifepathSource, this.InputYear, this.hasEventful)
    .subscribe( data => {
      this.levents = data;
      this.InputYear = this.levents.NumberOfYears.toString();
      this.emitLifeEvents(this.levents);
    });
  }

  emitLifeEvents(events: LifepathEventsList) {
    this.generateEvents.emit(events);
  }
}
