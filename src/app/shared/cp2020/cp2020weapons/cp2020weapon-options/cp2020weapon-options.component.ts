import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService, JsonDataFiles } from './../../../services/file-services';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CpPlayerWeaponOption, CpPlayerWeapon } from './../models';
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-cp2020weapon-options',
  templateUrl: './cp2020weapon-options.component.html',
  styleUrls: ['./cp2020weapon-options.component.css']
})
export class Cp2020weaponOptionsComponent implements OnInit, OnChanges {
  faTrash = faTrash;
  faPlus = faPlus;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  optionList: Array<CpPlayerWeaponOption> = new Array<CpPlayerWeaponOption>();
  options: Array<CpPlayerWeaponOption> = new Array<CpPlayerWeaponOption>();

  @Input()
  weapon: CpPlayerWeapon = new CpPlayerWeapon();

  @Output()
  updateOptions: EventEmitter<Array<CpPlayerWeaponOption>> = new EventEmitter<Array<CpPlayerWeaponOption>>();

  constructor(private dataService: DataService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.options = Array.isArray(this.weapon.options) ? new Array<CpPlayerWeaponOption>(...this.weapon.options):new Array<CpPlayerWeaponOption>();
  }

  ngOnChanges(): void {
    this.options = Array.isArray(this.weapon.options) ? new Array<CpPlayerWeaponOption>(...this.weapon.options):new Array<CpPlayerWeaponOption>();
  }

  getOptionCost(option: CpPlayerWeaponOption): number {
    if(option.costMultiplier && this.weapon.cost) {
      return option.costMultiplier * this.weapon.cost;
    }
    if(option.costPerRd && option.shotsMod && this.weapon.shots) {
      return option.costPerRd * option.shotsMod * this.weapon.shots;
    }
    return option.cost;
  }

  get totalOptionCosts(): number {
    return this.options.reduce( (a,b) => a + (b.totalCost * b.count),0);
  }

  add(index: number) {
    if(index < this.optionList.length){
      const opt = new CpPlayerWeaponOption(this.optionList[index]);
      opt.totalCost = this.getOptionCost(opt);
      const i = this.options.findIndex(o => o.name === opt.name);
      if(i > -1) {
        this.options[i].count++;
      }else {
        opt.count = 1;
        this.options.push(opt);
      }
      this.update();
    }
  }

  openModal(template: TemplateRef<any>) {
    if (this.optionList && this.optionList.length < 1) {
      this.dataService.GetJson(JsonDataFiles.CP2020_WEAPON_OPTIONS_LIST_JSON)
      .subscribe(data => {
        this.optionList = data.sort((a,b) => a.type.localeCompare(b.type) !== 0? a.type.localeCompare(b.type) :a.name.localeCompare(b.name) );
      });
    }
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

  delete(index: number) {
    this.options.splice(index, 1);
    this.update();
  }

  update() {
    this.updateOptions.emit(this.options);
  }

}
