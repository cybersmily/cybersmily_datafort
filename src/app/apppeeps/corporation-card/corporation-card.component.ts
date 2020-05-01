import { DataService } from './../../shared/services/data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Corporation, CorporationCard } from '../../shared/models/corporation';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'cs-corporation-card',
  templateUrl: './corporation-card.component.html',
  styleUrls: ['./corporation-card.component.css']
})
export class CorporationCardComponent implements OnInit {

  @Input()
  corporationCard: CorporationCard = {name: '', img: '', slogan: ''};

  @Input()
  corp: CorporationCard = {name: '', img: '', slogan: ''};

  corporateFile: string;
  corporateProfile: Corporation = new Corporation();
  bsModalRef: BsModalRef;
  corporateLogo: string;

  constructor(private dataService: DataService , public modalService: BsModalService) {
    this.corporateFile = '';
    this.corporateLogo = '';
  }

  ngOnInit() {
    this.corporateLogo = (this.corp) ?  `/img/peeps/th/th_${this.corp.img}.png` : '';
    this.corporateProfile = new Corporation();
  }

  openModal(template: TemplateRef<any>) {
    this.corporateFile = `/json/peeps/corporations/${this.corp.img}.json`;
    this.loadCorporation(template);
  }

  loadCorporation(template: TemplateRef<any>) {
    this.dataService
    .GetJson(this.corporateFile)
    .subscribe(
      resultObj => {
        this.corporateProfile = resultObj;
        this.bsModalRef = this.modalService.show(template, {class: 'modal-lg'});
      },
      error => console.log( 'Error :: ' + error)
    );
  }
}
