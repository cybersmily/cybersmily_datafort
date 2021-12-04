import { NrNodeType } from './../enums/nr-node-type';
import { NrNodeIcons } from './../enums/nr-node-icons';
import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { Cp2020DatafortBuilderService } from './../services/cp2020-datafort-builder.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'cs-cp2020-datafort-toolbar',
  templateUrl: './cp2020-datafort-toolbar.component.html',
  styleUrls: ['./cp2020-datafort-toolbar.component.css']
})
export class Cp2020DatafortToolbarComponent implements OnInit {
  NrNodeIcons = NrNodeIcons;

  currDatafort = new Cp2020NrDatafort();

  icons = [
    {title: 'Datawall Node'            ,type: NrNodeType.DATAWALL   , icon: NrNodeIcons.DATAWALL   },
    {title: 'Codegate Node'            ,type: NrNodeType.CODEGATE   , icon: NrNodeIcons.CODEGATE   },
    {title: 'CPU Node'                 ,type: NrNodeType.CPU        , icon: NrNodeIcons.CPU        },
    {title: 'Memory Unit Node'         ,type: NrNodeType.MU         , icon: NrNodeIcons.MU         },
    {title: 'Program Node'             ,type: NrNodeType.PROGRAM    , icon: NrNodeIcons.PROGRAM    },
    {title: 'LDL Node'                 ,type: NrNodeType.LDL        , icon: NrNodeIcons.LDL        },
    {title: 'Terminal Node'            ,type: NrNodeType.TERMINAL   , icon: NrNodeIcons.TERMINAL   },
    {title: 'Camera Node'              ,type: NrNodeType.CAMERA     , icon: NrNodeIcons.CAMERA     },
    {title: 'Microphone Node'          ,type: NrNodeType.MICROPHONE , icon: NrNodeIcons.MICROPHONE },
    {title: 'Videoscreen Node'         ,type: NrNodeType.VIDEO      , icon: NrNodeIcons.VIDEO      },
    {title: 'Holodisplay Node'         ,type: NrNodeType.HOLODISPLAY, icon: NrNodeIcons.HOLODISPLAY},
    {title: 'Printer Node'             ,type: NrNodeType.PRINTER    , icon: NrNodeIcons.PRINTER    },
    {title: 'Alarm Node'               ,type: NrNodeType.ALARM      , icon: NrNodeIcons.ALARM      },
    {title: 'Door/Gate Node'           ,type: NrNodeType.DOOR       , icon: NrNodeIcons.DOOR       },
    {title: 'Elevator Node'            ,type: NrNodeType.ELEVATOR   , icon: NrNodeIcons.ELEVATOR   },
    {title: 'Manipulator Node'         ,type: NrNodeType.MANIPULATOR, icon: NrNodeIcons.MANIPULATOR},
    {title: 'Autofactory Node'         ,type: NrNodeType.AUTOFACTORY, icon: NrNodeIcons.AUTOFACTORY},
    {title: 'Remote Vehicle/Robot Node',type: NrNodeType.VEHICLE    , icon: NrNodeIcons.VEHICLE    }
  ];

  constructor(private datafortBuilderService: Cp2020DatafortBuilderService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.datafortBuilderService.datafort
    .subscribe( datafort => {
      this.currDatafort = new Cp2020NrDatafort(datafort);
    });
  }

  isEnabled(nodeType: NrNodeType): boolean {
    if( nodeType === NrNodeType.CPU || nodeType === NrNodeType.MU ) {
      return this.getCount(nodeType) > 0;
    }
    return true;
  }

  getCount(nodeType: NrNodeType ): number {
    const numOfCodegates = this.currDatafort.cpu - this.currDatafort.codegateNodes.length;
    const numOfMUs = (this.currDatafort.cpu * 4) - this.currDatafort.muNodes.length;
    const numOfCPUs = this.currDatafort.cpu - this.currDatafort.cpuNodes.length;
    switch(nodeType){
      case NrNodeType.CPU:
        return numOfCPUs > 0 ?  numOfCPUs : null;
      case NrNodeType.MU:
        return numOfMUs > 0 ?  numOfMUs : null;
      case NrNodeType.CODEGATE:
        return numOfCodegates > 0 ?  numOfCodegates : null;
      default:
        return;
    }
  }

  selectTool(icon: NrNodeType ) {
    if(icon === this.datafortBuilderService.selectedTool) {
      this.datafortBuilderService.selectedTool = -1;
    } else {
      this.datafortBuilderService.selectedTool = icon;
    }
  }
}
