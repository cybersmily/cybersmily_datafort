import { CPRedLifepathJumpStartData } from './../../shared/cpred/c-p-red-lifepath/models/cp-red-lifepath-js-data';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { DataService } from './../../shared/services/file-services';
import { CPRedLifePathService } from './../../shared/cpred/c-p-red-lifepath/services/c-p-red-life-path.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { SeoService } from './../../shared/services/seo/seo.service';
import { NameGeneratorService } from '../../shared/services/namegen/name-generator.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CpRedTemplateGeneratorService } from '../../shared/cpred/services/cp-red-template-generator/cp-red-template-generator.service';
import { CpRedBaseCharacter } from '../../shared/cpred/models/cp-red-base-character';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-temp-generator',
  templateUrl: './temp-generator.component.html',
  styleUrls: ['./temp-generator.component.css'],
})
export class TempGeneratorComponent implements OnInit {
  faDice = faDice;

  character: CpRedBaseCharacter;
  roles: string[];

  constructor(
    private templateGenerator: CpRedTemplateGeneratorService,
    private dice: DiceService,
    private lifepathService: CPRedLifePathService,
    private nameService: NameGeneratorService,
    private dataService: DataService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk Red Jumpstart Kit Charcter generator',
      "2020-07, Cybersmily's Datafort Cyberpunk  Red Jumpstart Kit Charcter generator is an application to generate characters based on the Cyberpunk Red character templates."
    );
    this.character = new CpRedBaseCharacter();
    this.roles = new Array<string>();
    this.roles.push('Fixer');
    this.roles.push('Netrunner');
    this.roles.push('Solo');
    this.roles.push('Nomad');
    this.roles.push('Tech');
    this.roles.push('Rockerboy');
  }
  generate() {
    const roll = this.dice.generateNumber(0, this.roles.length - 1);
    const role = this.roles[roll];
    this.templateGenerator.generateCharacter(role).subscribe((data) => {
      this.character = data;
      this.dataService
        .GetJson<{ jumpstart: CPRedLifepathJumpStartData }>(
          JsonDataFiles.CPRED_LIFEPATH_CHART_JSON
        )
        .subscribe((data) => {
          this.character.lifepath = this.lifepathService.generateJumpStart(
            data.jumpstart
          );
          this.nameService.generateName().subscribe((name) => {
            this.character.name = name;
          });
        });
    });
  }
}
