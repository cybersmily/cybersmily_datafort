import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { CPRedIconTypeSettings } from './../models/net-arch-node';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'cs-net-arch-settings',
  templateUrl: './net-arch-settings.component.html',
  styleUrls: ['./net-arch-settings.component.css']
})
export class NetArchSettingsComponent implements OnInit {
  faRedo = faRedo;

  @Input()
  iconColors: CPRedIconTypeSettings;

  @Output()
  updateColors: EventEmitter<CPRedIconTypeSettings> = new EventEmitter<CPRedIconTypeSettings>();

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered'
  };

  selectedColor = '';

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  changeColor($event: ColorEvent) {
    this.selectedColor = $event.color.hex;
  }

  setSelectedColor(color: string) {
    this.selectedColor = color;
  }

  setColor(type: string) {
    if (type === 'Program') {
      this.iconColors.program.color = this.selectedColor;
    } else if(type === 'File') {
      this.iconColors.file.color = this.selectedColor;
    }
    else if(type === 'Password') {
      this.iconColors.password.color = this.selectedColor;
    }
    else if(type === 'Controller Node') {
      this.iconColors.controlNode.color = this.selectedColor;
    }
    else if(type === 'background') {
      this.iconColors.background = this.selectedColor;
    }
    else if(type === 'foreground') {
      this.iconColors.foreground = this.selectedColor;
    }
    else if(type === 'border') {
      this.iconColors.border = this.selectedColor;
    }
    this.updateColors.emit(this.iconColors);
  }

  setBgColor(type: string) {
    if (type === 'Program') {
      this.iconColors.program.bgColor = this.selectedColor;
    } else if(type === 'File') {
      this.iconColors.file.bgColor = this.selectedColor;
    }
    else if(type === 'Password') {
      this.iconColors.password.bgColor = this.selectedColor;
    }
    else if(type === 'Controller Node') {
      this.iconColors.controlNode.bgColor = this.selectedColor;
    }
    this.updateColors.emit(this.iconColors);
  }

  resetColor(type: string) {
    const base = new CPRedIconTypeSettings();
    if (type === 'Program') {
      this.iconColors.program.color = base.program.color;
    } else if(type === 'File') {
      this.iconColors.file.color = base.file.color;
    }
    else if(type === 'Password') {
      this.iconColors.password.color = base.password.color;
    }
    else if(type === 'Controller Node') {
      this.iconColors.controlNode.color = base.controlNode.color;
    }
    this.updateColors.emit(this.iconColors);
  }

  resetBgColor(color: string, type: string) {
    const base = new CPRedIconTypeSettings();
    if (type === 'Program') {
      this.iconColors.program.bgColor = this.selectedColor;
    } else if(type === 'File') {
      this.iconColors.file.bgColor = this.selectedColor;
    }
    else if(type === 'Password') {
      this.iconColors.password.bgColor = this.selectedColor;
    }
    else if(type === 'Controller Node') {
      this.iconColors.controlNode.bgColor = this.selectedColor;
    }
    this.updateColors.emit(this.iconColors);
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  reset() {
    this.iconColors = new CPRedIconTypeSettings();
    this.updateColors.emit(this.iconColors);
  }
}
