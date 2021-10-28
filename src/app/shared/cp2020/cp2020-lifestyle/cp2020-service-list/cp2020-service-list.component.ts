import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService, JsonDataFiles } from './../../../services/file-services';
import { Cp2020Services } from '../models/cp2020-services';
import { faTrash, faPlus, faList, faDollarSign, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-cp2020-service-list',
  templateUrl: './cp2020-service-list.component.html',
  styleUrls: ['./cp2020-service-list.component.css']
})
export class Cp2020ServiceListComponent implements OnInit, OnChanges {
  faTrash = faTrash;
  faPlus = faPlus;
  faList = faList;
  faDollarSign = faDollarSign;
  faEuroSign = faEuroSign;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'};

  @Input()
  servicesList: Array<Cp2020Services> = new Array<Cp2020Services>();

  @Output()
  updateServices: EventEmitter<Array<Cp2020Services>> = new EventEmitter<Array<Cp2020Services>>();

  @Output()
  pay: EventEmitter<number> = new EventEmitter<number>();

  servicesData: Array<Cp2020Services> = new Array<Cp2020Services>();
  currServices: Array<Cp2020Services> = new Array<Cp2020Services>();
  selectedService: Cp2020Services = {
    name: '',
    cost: 0,
    count: 1,
    unit: 'month'
  };
  selectedIndex: number = -1;

  get totalMonthlyCost(): number {
    const cost = this.currServices.reduce( (a, b) => a + this.calculateMonthlyCost(b), 0);
    return cost;
  }

  constructor(private dataService: DataService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.currServices = JSON.parse(JSON.stringify(this.servicesList));
    this.dataService.GetJson(JsonDataFiles.CP2020_LIFESTYLE_SERVICES_JSON)
    .subscribe( data => {
      this.servicesData = data;
    });
  }

  ngOnChanges(): void {
    this.currServices = JSON.parse(JSON.stringify(this.servicesList));
  }

  calculateMonthlyCost(service: Cp2020Services): number {
    let cost = 0;
    if (service.unit === 'month') {
      cost = (service.cost * service.count);
    } else if (service.unit === 'day') {
      cost = (service.cost * service.count * 30);
    } else if (service.unit === 'year') {
      cost = (Math.ceil((service.cost * service.count)/12));
    }
    if (service.options && service.options.length > 0) {
      cost += service.options.reduce( (a,b) => a + this.calculateMonthlyCost(b), 0);
    }
    return cost;
  }

  add() {
    this.currServices.push( {
      name: '',
      cost: 0,
      count: 1,
      unit: 'month'
    });
    this.update();
  }

  changeName(value: string, index: number) {
    const name = value.split(':')[1].trim();
    const selection = this.servicesData.filter( s => s.name === name)[0];
    this.currServices[index].cost = selection.cost;
    this.currServices[index].unit = selection.unit;
    if (selection.options && selection.options.length > 0) {
      this.currServices[index].options = JSON.parse(JSON.stringify(selection.options));
    }
    this.update();
  }

  delete(index: number) {
    this.currServices.splice(index, 1);
    this.update();
  }

  update() {
    this.updateServices.emit(this.currServices);
  }

  payServices() {
    this.pay.emit(this.totalMonthlyCost);
  }

  showModal(template: TemplateRef<any>, index: number) {
    this.selectedService = this.currServices[index];
    this.selectedIndex = index;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
    this.selectedIndex = -1;
  }

  checkOption(index: number) {
    this.currServices[this.selectedIndex].options[index].count = this.currServices[this.selectedIndex].options[index].count > 0 ? 0 : 1;
    this.update();
  }

  getOptionValue(index: number): boolean {
    if (this.currServices[this.selectedIndex].options) {
      return this.currServices[this.selectedIndex].options[index].count > 0;
    }
    return false;
  }

}
