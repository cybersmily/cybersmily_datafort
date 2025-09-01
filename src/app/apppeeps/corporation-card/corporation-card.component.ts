import { Observable } from 'rxjs';
import { DataService } from './../../shared/services/file-services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Corporation, CorporationCard } from '../../shared/models/corporation';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'cs-corporation-card',
    templateUrl: './corporation-card.component.html',
    styleUrls: ['./corporation-card.component.css'],
    standalone: false
})
export class CorporationCardComponent implements OnInit {

  @Input()
  corporationCard: CorporationCard = {name: '', img: '', slogan: ''};

  @Input()
  corp: CorporationCard = {name: '', img: '', slogan: ''};

  corporateProfile$: Observable<Corporation>;
  bsModalRef: BsModalRef;

  get corporateLogo(): string {
    return (this.corp) ?  `/img/peeps/th/th_${this.corp.img}.png` : '';
  }

  get corporateFile(): string{
    return  (this.corp) ? `/json/peeps/corporations/${this.corp.img}.json` : '';
  }

  constructor(private dataService: DataService , public modalService: BsModalService) {}

  ngOnInit() {}

  openModal(template: TemplateRef<any>) {
    this.loadCorporation(template);
    this.bsModalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  loadCorporation(template: TemplateRef<any>) {
    this.corporateProfile$ = this.dataService
    .GetJson(this.corporateFile);
  }
}
