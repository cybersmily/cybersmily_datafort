import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Cp2020Stat, StatModifier } from './../models';
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { take, tap, timeout } from 'rxjs';

@Component({
  selector: 'cs-cp2020-stat',
  templateUrl: './cp2020-stat.component.html',
  styleUrls: ['./cp2020-stat.component.css']
})
export class Cp2020StatComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered'
  };

  @Input()
  stat: Cp2020Stat = new Cp2020Stat();

  @Input()
  statName = '';

  @Output()
  changeStat: EventEmitter<{statName: string, stat: Cp2020Stat}> = new EventEmitter<{statName: string, stat: Cp2020Stat}>();

  @ViewChild('cp2020StatElem', {static: false})
  statElem: ElementRef;

  newStatModifier: StatModifier = {name: '', mod: 0};

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  get isWounded(): boolean {
    return (this.stat.WoundModifier < 0 || this.stat.Multiplier !== 1 );
  }

  onStatChange($event: {statName: string, stat: Cp2020Stat}) {
    this.changeStat.emit($event);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
    this.modalRef.onHidden.subscribe(()=>{
      this.statElem.nativeElement.focus();
    });
  }

  closeModal() {
    this.modalRef.hide();
  }
}
