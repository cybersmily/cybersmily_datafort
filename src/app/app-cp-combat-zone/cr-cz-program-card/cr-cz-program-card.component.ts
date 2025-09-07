import { Component, input, model, OnInit, output } from '@angular/core';
import { faTrash, faCircleCheck, faBookBookmark, faRedo, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { iCrCzNrProgramCard } from '../models/cr-cz-nr-program-card';
import { Observable } from 'rxjs';
import { CrCzReleasesDataService } from '../services/cr-cz-releases-data/cr-cz-releases-data.service';

@Component({
  selector: 'cs-cr-cz-program-card',
  standalone: false,
  templateUrl: './cr-cz-program-card.component.html',
  styleUrl: './cr-cz-program-card.component.css'
})
export class CrCzProgramCardComponent implements OnInit {
  faTrash = faTrash;
  faCircleCheck = faCircleCheck;
  faBookBookmark = faBookBookmark;
  faRedo = faRedo;
  faPlay = faPlay;
  faPlus = faPlus;

  showBothSides = input<boolean>(true);
  crczProgram = input<iCrCzNrProgramCard>(null);

  selectProgram = output<iCrCzNrProgramCard>();

  releaseList$: Observable<Array<string>>;

  programCardSideStyle = {
    dimensions: {
      width: '150px',
      height: '220px'
    },
    title: {
      width: '95px',
      left: '19px',
      top: '14px',
      'line-height': '0.95em',
    },
    creds: {
      right: '15px',
      top: '15px'
    }
  };

  programCardRunningStyles = {
    programEffectTitle: {
      left: '15px',
      top: '53px',
      'line-height': '0.95em',
      width: '100px'
    },
    programRefreshTitle: {
      left: '15px',
      top: '140px',
      'line-height': '0.95em',
      width: '100px'
    },
    programEffect: {
      left: '15px',
      top: '70px',
      'line-height': '0.9em',
      width: '130px',
      'font-size': '0.5em'
    },
    programRefresh: {
      left: '15px',
      top: '157px',
      'line-height': '0.9em',
      width: '130px'
    }

  }

  programCardLoadedStyles = {
    loadDescription: {
      width: '100px',
      left: '45px',
      top:  '60px',
      'line-height': '0.95em',
    },
    ebCost: {
      right: '15px',
      bottom: '14px',
      'line-height': '1.0em'
    },
    eb: {
      right: '5px',
      bottom: '12px',
      'line-height': '1.0em'
    },
    rarity: {
      left: '15px',
      bottom: '14px',
      'line-height': '0.95em',
    }
  }

  programMenuStyle = {
    width: '40px',
    height: '220px'
  };

  programCardStyle = {
    width: '340px',
    height: '220px',
    transform: 'scale(1.0)',
    margin: '0px'
  }


  constructor(private releaseListService: CrCzReleasesDataService) {}

  ngOnInit(): void {
    this.releaseList$ = this.releaseListService.GetFullReleaseNames(this.crczProgram().release);
    if(this.showBothSides()) {
      this.setBothSidesLayout();
    } else {
      this.setSingleSideLayout();
    }
  }

  setSingleSideLayout(): void {
    this.programCardStyle.width = '190px';
    this.programCardStyle.transform ='scale(1.4)';
    this.programCardStyle.margin = '50px';
    if(this.crczProgram().effect.length > 250) {
      this.programCardRunningStyles.programEffect['font-size'] = '0.4em';
    }
    if(this.crczProgram()?.range) {
      this.programCardLoadedStyles.loadDescription.top = '75px';
    }
    this.programCardRunningStyles.programEffect.width ='126px'
  }

  setBothSidesLayout(): void {
    this.programCardStyle.width = '340px';
    this.programCardStyle.transform ='scale(1.0)';
    this.programCardStyle.margin = '0px';
    if(this.crczProgram()?.range) {
      this.programCardLoadedStyles.loadDescription.top = '75px';
    }
  }

  toggleRunningStatus(value: boolean): void {
    this.crczProgram().isRunning = value;
  }

  clickSelectProgram(): void {
    this.selectProgram.emit(this.crczProgram());
  }

}
