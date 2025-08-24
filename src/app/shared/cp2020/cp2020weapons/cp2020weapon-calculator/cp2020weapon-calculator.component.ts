import { WeaponRanges } from './../models/weapon-ranges';
import { Cp2020MartialArt, Cp2020PlayerSkills,  Cp2020PlayerSkill} from '../../cp2020-skills/models';
import { MartialArtsDataService } from './../../cp2020-skills/services';
import { DiceRolls } from './../../../models/dice-rolls';
import { DiceService } from './../../../services/dice/dice.service';
import { CpPlayerWeaponList, CpPlayerWeapon, CombatRange } from './../models';
import { faDice, faRedo, faChevronDown, faChevronRight, faTimes} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Component({
    selector: 'cs-cp2020weapon-calculator',
    templateUrl: './cp2020weapon-calculator.component.html',
    styleUrls: ['./cp2020weapon-calculator.component.css'],
    standalone: false
})
export class Cp2020weaponCalculatorComponent implements OnInit, OnChanges {
  faDice = faDice;
  faRedo = faRedo;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faTimes = faTimes;

  collapseAttackerMods = false;
  collapseTargetMods = false;


  @Input()
  weaponList: CpPlayerWeaponList = new CpPlayerWeaponList();

  @Input()
  isCollapsed = true;

  @Input()
  showHeader = false;

  @Input()
  ref = 0;

  @Input()
  bodyDamageMod = 0;

  @Input()
  body = 0;

  @Input()
  skills: Cp2020PlayerSkills = new Cp2020PlayerSkills();

  @Input()
  handle = '';

  opponents: any = {};

  shots = 0;
  rangeToTarget = 1;
  fireMode = 2; // default to single shot
  shotsFired = 1;
  aimedTurns = 0;
  targetMovementModified = 0;
  targetSize = 0;
  targetDodge = false;
  targetSilhoutted = false;
  turnToFaceTarget = false;
  smartWeapon = false;
  laserSight = false;
  teleSight = false;
  targetScope = false;

  fastDraw = false;
  ambush = false;
  aimedBody = false;
  ricochet = false;
  blind = false;
  twoWeapons = false;
  running = false;
  fireFromHip = false;

  selectedWeaponRange = 0;

  otherToHitModifiers = 0;
  toHitDiceRoll = new DiceRolls();
  toHitResults: Array<string> = Array<string>();

  martialArtsList: Array<Cp2020MartialArt> = new Array<Cp2020MartialArt>();

  selectedSkill: Cp2020PlayerSkill = new Cp2020PlayerSkill();
  selectedWeapon: CpPlayerWeapon;
  physicalAttacks: Array<CpPlayerWeapon> = [
    new CpPlayerWeapon({
      name: 'Punch',
      wa: 0,
      conc: '-',
      avail: '-',
      type: 'MEL',
      damage: '1D6/2',
      range: 1,
    }),
    new CpPlayerWeapon({
      name: 'Kick',
      wa: 0,
      conc: '-',
      avail: '-',
      type: 'MEL',
      damage: '1D6',
      range: 1,
    }),
    new CpPlayerWeapon({
      name: 'Throw',
      wa: 0,
      conc: '-',
      avail: '-',
      type: 'MEL',
      damage: '1D6',
      range: 1,
    }),
    new CpPlayerWeapon({
      name: 'Hold',
      wa: 0,
      conc: '-',
      avail: '-',
      type: 'MEL',
      damage: '',
      range: 1,
    }),
    new CpPlayerWeapon({
      name: 'Choke',
      wa: 0,
      conc: '-',
      avail: '-',
      type: 'MEL',
      damage: '1D6',
      range: 1,
    }),
    new CpPlayerWeapon({
      name: 'Sweep',
      wa: 0,
      conc: '-',
      avail: '-',
      type: 'MEL',
      damage: '1D6+3',
      range: 1,
    }),
    new CpPlayerWeapon({
      name: 'Grapple',
      wa: 0,
      conc: '-',
      avail: '-',
      type: 'MEL',
      damage: '',
      range: 1,
    }),
    new CpPlayerWeapon({
      name: 'Ram',
      wa: 0,
      conc: '-',
      avail: '-',
      type: 'MEL',
      damage: '',
      range: 1,
    }),
  ];

  selectedWeaponRanges: WeaponRanges = new WeaponRanges(0);
  rangeBracket: string = 'Point Blank';

  constructor(
    private diceService: DiceService,
    private maService: MartialArtsDataService
  ) {}

  ngOnInit(): void {
    this.maService.martialArtsBonuses.subscribe((data) => {
      this.martialArtsList = data;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // logic is for the combat tracker if there are multiple opponents
    if (
      changes.handle &&
      changes.handle.currentValue !== changes.handle.previousValue
    ) {
      if (this.opponents[this.handle]) {
        this.selectedSkill =
          this.opponents[this.handle]['skill'] || new Cp2020PlayerSkill();
        this.selectedWeapon = this.opponents[this.handle].weapon || undefined;
      } else {
        this.selectedSkill = new Cp2020PlayerSkill();
        this.selectedWeapon = undefined;
      }
    }
  }
  get currMagazineShots(): Array<boolean> {
    if (this.selectedWeapon.currMag) {
      const arr = Array<boolean>(this.selectedWeapon.currMag.capacity);
      arr.fill(true,0, this.selectedWeapon.currMag.used).fill(false, this.selectedWeapon.currMag.used);
      return arr;
    }
    return new Array();
  }

  get filteredList(): Array<CpPlayerWeapon> {
    return this.weaponList.items.filter((wpn) => wpn.name !== '');
  }

  get totalToHit(): number {
    return (
      this.selectedSkill.value +
      this.ref +
      this.martialArtBonus +
      this.selectedWeapon.wa +
      this.toHitDiceRoll.total
    );
  }

  get targetActionModifier(): number {
    let total = 0;
    total += this.targetDodge ? 2 : 0;
    total += this.targetSilhoutted ? -2 : 0;
    total += this.turnToFaceTarget ? 2 : 0;
    total += this.targetSize;
    total += this.targetMovementModified;
    return total;
  }

  get attackerActionModifier(): number {
    let total = 0;
    total += this.fastDraw ? 3 : 0;
    total += this.ambush ? -5 : 0;
    total += this.aimedBody ? 4 : 0;
    total += this.ricochet ? 5 : 0;
    total += this.blind ? 3 : 0;
    total += this.twoWeapons ? 3 : 0;
    total += this.running ? 3 : 0;
    total += this.fireFromHip ? 2 : 0;
    total += this.aimedTurns;
    return total;
  }

  get sightSmartModifier(): number {
    let total = 0;
    total += this.smartWeapon ? -2 : 0;
    total += this.laserSight ? -1 : 0;
    total += this.teleSight
      ? this.selectedWeaponRanges.rangeBracket(this.rangeToTarget).bracket === 'Medium'
        ? -1
        : this.selectedWeaponRanges.rangeBracket(this.rangeToTarget).bracket === 'Extreme'
        ? -2
        : 0
      : 0;
    total += this.targetScope ? -1 : 0;
    return total;
  }

  get filteredSkills(): Array<Cp2020PlayerSkill> {
    let skills = [
      new Cp2020PlayerSkill({ name: 'not trained', stat: 'ref', value: 0 }),
    ];
    if (this.selectedWeapon) {
      skills = this.skills.getSkillForWeaponType(this.selectedWeapon.type, this.selectedWeapon?.thrown);
    }
    return skills;
  }

  get totalDiff(): number {
    let total = 0;
    total = this.selectedWeaponRanges.rangeBracket(this.rangeToTarget).diff;
    total += this.fireModeModifier;
    total += this.targetSize;
    total += this.targetActionModifier;
    total += this.sightSmartModifier;
    total += this.attackerActionModifier;
    total += this.otherToHitModifiers;
    return total;
  }

  get isRanged(): boolean {
    return this.selectedWeapon.isRangedWeapon;
  }

  get fireModeModifier(): number {
    if (this.fireMode === 1 && this.selectedWeaponRanges.rangeBracket(this.rangeToTarget).diff < 16) {
      return -3;
    }
    if (this.fireMode === 3) {
      return (
        (this.selectedWeaponRanges.rangeBracket(this.rangeToTarget).diff < 11 ? 1 : -1) *
        Math.ceil(this.shotsFired / 10)
      );
    }
    return 0;
  }

  get fireShots(): number {
    if (this.fireMode === 2) {
      return this.selectedWeapon.rof > 3 ? 2 : this.selectedWeapon.rof;
    } else if (this.fireMode === 1) {
      return 3;
    } else {
      return this.selectedWeapon.rof;
    }
  }

  get weaponRange(): number {
    if (this.selectedWeapon.range && this.selectedWeapon.range > 1) {
      return this.selectedWeapon.range;
    } else  if (this.selectedWeapon.thrown) {
      return this.body * 10;
    } else {
      switch (this.selectedWeapon.type.toLowerCase()) {
        case 'p':
          return 50;
        case 'smg':
          return 150;
        case 'rif':
          return 400;
        case 'sht':
          return 50;
        default:
          return 1;
      }
    }
  }

  get martialArtBonus(): number {
    if(this.isMartialArt) {
      return this.selectedSkill?.maBonuses[this.selectedWeapon.name.toLowerCase()];
    }
    return 0;
  }

  get isMartialArt(): boolean {
    return (
      this.selectedSkill?.name?.toLowerCase().startsWith('martial')
    );
  }

  get isMelee(): boolean {
    return this.selectedWeapon.type.toLowerCase() === 'mel';
  }

  get martialArtsBonuses(): Cp2020MartialArt {
    if (this.isMartialArt) {
      const martialArt = this.selectedSkill.name.includes(':')
        ? this.selectedSkill.name.split(':')[1].trim()
        : this.selectedSkill.option;
      const bonuses = this.martialArtsList.filter(
        (ma) => ma.name.toLowerCase() === martialArt.toLowerCase()
      );
      if (bonuses.length > 0) {
        return bonuses[0];
      }
    }
    return {
      name: '',
      source: { book: '', page: 0 },
      ipMod: 0,
      strike: 0,
      punch: 0,
      kick: 0,
      disarm: 0,
      sweep: 0,
      block: 0,
      dodge: 0,
      grapple: 0,
      throw: 0,
      hold: 0,
      choke: 0,
      escape: 0,
      ram: 0,
    };
  }

  rollToHit() {
    if (this.fireMode === 1) {
     this.shotsFired = 3;
    }
    const results = this.selectedWeapon.rollToHit(
      this.diceService,
      this.ref,
      this.selectedSkill,
      this.totalDiff,
      this.fireMode,
      this.shotsFired,
      this.bodyDamageMod
    );
    this.toHitDiceRoll = results.dieRoll;
    this.toHitResults = results.results;
  }

  changeWeapon() {
    if (this.handle !== '') {
      if (!this.opponents[this.handle]) {
        this.opponents[this.handle] = {};
      }
      this.opponents[this.handle]['weapon'] = this.selectedWeapon;
    }
    this.selectedSkill = new Cp2020PlayerSkill();
    if (this.selectedWeapon && this.filteredSkills.length < 2) {
      this.selectedSkill = this.filteredSkills[0];
      if (this.handle !== '') {
        this.opponents[this.handle]['skill'] = this.selectedSkill;
      }
    }
    this.toHitResults = new Array<string>();
    this.selectedWeaponRanges = new WeaponRanges(this.weaponRange);
  }

  setBracket() {
    this.rangeBracket =  this.selectedWeaponRanges.rangeBracket(this.rangeToTarget).bracket;
  }

  changeSkill($event): void {
    if (this.handle !== '') {
      this.opponents[this.handle]['skill'] = this.selectedSkill;
    }
  }

  deselectWeapon(): void {
    this.selectedWeapon = undefined;
    this.selectedSkill = new Cp2020PlayerSkill();
  }

  setRange($event) {
    $event.stopPropagation();
    const range = $event.target.value;
    this.selectedWeaponRanges = new WeaponRanges(this.weaponRange);
    this.rangeToTarget = this.selectedWeaponRanges[range?.toLowerCase().replace(' ', '')] ?? 1;

  }
}
