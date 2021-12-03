import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { Cp2020DatafortBuilderService } from './../services/cp2020-datafort-builder.service';
import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faAlignJustify, faCaretSquareUp, faLaptop, faMicrophone, faSquare, faTv, faVectorSquare, faVideo, faFile, faTruck, faBezierCurve, faDoorClosed, faCalendar, faHandLizard, faCogs, faSkullCrossbones, faEraser } from '@fortawesome/free-solid-svg-icons';
import { faMicroblog } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'cs-cp2020-datafort-toolbar',
  templateUrl: './cp2020-datafort-toolbar.component.html',
  styleUrls: ['./cp2020-datafort-toolbar.component.css']
})
export class Cp2020DatafortToolbarComponent implements OnInit {
  faSquare = faSquare;
  faCircle = faCircle;
  faCaretSquareUp = faCaretSquareUp;
  faAlighJustify = faAlignJustify;
  faVectorSquare = faVectorSquare;
  faMicrophone = faMicrophone;
  faVideo = faVideo;
  faLaptop = faLaptop;
  faTv = faTv;
  faFile = faFile;
  faTruck = faTruck;
  faBezierCurve = faBezierCurve;
  faDoorClosed = faDoorClosed;
  faCalendar = faCalendar;
  faHandLizard = faHandLizard;
  faCogs = faCogs;
  faSkullCrossbones = faSkullCrossbones;
  faEraser = faEraser;

  currDatafort = new Cp2020NrDatafort();

  icons = [
    {title: 'Datawall Node', icon: faSquare},
    {title: 'Codegate Node', icon: faAlignJustify},
    {title: 'CPU Node', icon: faCircle},
    {title: 'Memory Unit Node', icon: faVectorSquare},
    {title: 'Program Node', icon: faSkullCrossbones},
    {title: 'LDL Node', icon: faCaretSquareUp},
    {title: 'Microphone Node', icon: faMicrophone},
    {title: 'Camera Node', icon: faVideo},
    {title: 'Terminal Node', icon: faLaptop},
    {title: 'Videoscreen Node', icon: faTv},
    {title: 'Printer Node', icon: faFile},
    {title: 'Remote Vehicle Node', icon: faTruck},
    {title: 'Remote Robot Node', icon: faBezierCurve},
    {title: 'Door/Gate Node', icon: faDoorClosed},
    {title: 'Elevator Node', icon: faCalendar},
    {title: 'Manipulator Node', icon: faHandLizard},
    {title: 'Autofactory Node', icon: faCogs},
    {title: 'Erase Node', icon: faEraser}
  ];

  constructor(private datafortBuilderService: Cp2020DatafortBuilderService) { }

  ngOnInit(): void {
    this.datafortBuilderService.datafort
    .subscribe( datafort => {
      this.currDatafort = new Cp2020NrDatafort(datafort);
      console.log('tools datafort', datafort);
    });
    console.log(this.faSquare);
  }

  getCount(iconName: string ): number {
    switch(iconName){
      case faAlignJustify.iconName:
        return this.currDatafort.cpu - this.currDatafort.codegateNodes.length;
      case faCircle.iconName:
        return this.currDatafort.cpu - this.currDatafort.cpuNodes.length;
      case faVectorSquare.iconName:
        return this.currDatafort.cpu * 4;
      case faSkullCrossbones.iconName:
        return this.currDatafort.defenses.length;
      case faCaretSquareUp.iconName:
      case faMicrophone.iconName:
      case faVideo.iconName:
      case faLaptop.iconName:
      case faTv.iconName:
      case faFile.iconName:
      case faTruck.iconName:
      case faBezierCurve.iconName:
      case faDoorClosed.iconName:
      case faCalendar.iconName:
      case faHandLizard.iconName:
      case faCogs.iconName:
      default:
        return;
    }
  }

  selectTool(icon: any ) {
    this.datafortBuilderService.selectedTool = icon;
  }

}
