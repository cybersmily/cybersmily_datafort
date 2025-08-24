import { NrNodeType } from './../../enums/nr-node-type';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nrNodeDisplayName',
    standalone: false
})
export class NrNodeDisplayNamePipe implements PipeTransform {

  transform(value: NrNodeType): string {
    switch(value) {
      case NrNodeType.DATAWALL:
        return 'Datawall';
      case NrNodeType.CODEGATE:
        return 'Codegate';
      case NrNodeType.CPU:
        return 'CPU';
      case NrNodeType.MU:
        return 'Memory Unit';
      case NrNodeType.PROGRAM:
        return 'Program';
      case NrNodeType.ALARM:
        return 'Alarm';
      case NrNodeType.AUTOFACTORY:
        return 'Autofactory';
      case NrNodeType.DOOR:
        return 'Door/Gate';
      case NrNodeType.ELEVATOR:
        return 'Elevator';
      case NrNodeType.TERMINAL:
        return 'Terminal';
      case NrNodeType.LDL:
        return 'LDL';
      case NrNodeType.CAMERA:
        return 'Camera';
      case NrNodeType.MICROPHONE:
        return 'Microphone';
      case NrNodeType.VIDEO:
        return 'Videoscreen';
      case NrNodeType.HOLODISPLAY:
        return 'Holodisplay';
      case NrNodeType.PRINTER:
        return 'Printer';
      case NrNodeType.MANIPULATOR:
        return 'Manipulator';
      case NrNodeType.VEHICLE:
        return 'Remote Vehicle/Robot';
      default:
        return '';
    }
  }

}
