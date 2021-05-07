import { faPlus, faTrash, faPen, faRedo, faEuroSign, faList } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp2020-lifestyle',
  templateUrl: './cp2020-lifestyle.component.html',
  styleUrls: ['./cp2020-lifestyle.component.css']
})
export class Cp2020LifestyleComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faPen = faPen;
  faRedo = faRedo;
  faEuroSign = faEuroSign;
  faList = faList;

  constructor() { }

  ngOnInit(): void {
  }

}
