import { Component, OnInit } from '@angular/core';
import { faAngleDoubleRight, faAngleDoubleDown, faDice,
  faTrash, faHeartBroken, faHeart, faHeartbeat,
  faFirstAid, faSkull, faTint , faRedo, faSave,
  faPlus, faMinus, faUpload, faFileImport, faCopy,
  faSkullCrossbones, faEyeSlash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cmbt-trck-instructions',
  templateUrl: './cmbt-trck-instructions.component.html',
  styleUrls: ['./cmbt-trck-instructions.component.css']
})
export class CmbtTrckInstructionsComponent implements OnInit {
  isCollapsed = true;
  isTopMenuCollapsed = true;
  isLeftCollapsed = true;
  isRightCollapsed = true;
  isModifiedCollapsed = true;
  isStatCollapsed = true;
  isSkillCollapsed = true;
  isWeaponCollapsed = true;
  isCyberwareCollapsed = true;
  isWoundsCollapsed = true;
  isArmorCollapsed = true;
  isGearCollapsed = true;


  faAngleDoubleRight = faAngleDoubleRight;
  faAngleDoubleDown = faAngleDoubleDown;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faRedo = faRedo;
  faSave = faSave;
  faUpload = faUpload;
  faFileImport = faFileImport;
  faHeartBroken = faHeartBroken;
  faHeart = faHeart;
  faHeartbeat = faHeartbeat;
  faFirstAid = faFirstAid;
  faSkull = faSkull;
  faTint = faTint;
  faDice = faDice;

  faPlus = faPlus;
  faMinus = faMinus;
  faTrash = faTrash;
  faCopy = faCopy;
  faEyeSlash = faEyeSlash;
  faSkullCrossbones = faSkullCrossbones;


  constructor() { }

  ngOnInit() {
  }

}
