import { SeoService } from './../../shared/services/seo/seo.service';
import { SaveFileService } from './../../shared/services/save-file.service';
import { RedJumpkitLifepathService } from './../../shared/services/lifepath/red-jumpkit-lifepath.service';
import { CPRedLifepathData } from './../../shared/models/lifepath/cpred-lifepath-data';
import { CPRedLifepath } from './../../shared/models/lifepath/cpred-lifepath';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-app-lifepath-red-jumpkit',
  templateUrl: './app-lifepath-red-jumpkit.component.html',
  styleUrls: ['./app-lifepath-red-jumpkit.component.css']
})
export class AppLifepathRedJumpkitComponent implements OnInit {

  enabled = false;
  LifePath = new CPRedLifepath();

  constructor(private lifepathService: RedJumpkitLifepathService,
              private saveFileService: SaveFileService,
              private seo: SeoService) {}

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk Red Jumpstart Kit Lifepath',
      '2020-07, Cybersmily\'s Datafort Cyberpunk  Red Jumpstart Kit Lifepath is an application to generate a character\'s lifepath.'
    );
    this.enabled = true;
    this.LifePath = new CPRedLifepath();
  }

  generate() {
    this.lifepathService
    .generateLifePath()
    .subscribe(data => this.LifePath = data);
  }

  generateBackground() {
    this.lifepathService
    .generateBackground()
    .subscribe( data => this.LifePath.background = data);
  }

  generateMotivation() {
    this.lifepathService
    .generateMotivation()
    .subscribe( data => this.LifePath.motivation = data);
  }

  generateGoals() {
    this.lifepathService
    .generateGoals()
    .subscribe( data => this.LifePath.goals = data);
  }

  generateRomance() {
    this.lifepathService
    .generateRomance()
    .subscribe( data => this.LifePath.romance = data);
  }

  generatePersonality() {
    this.lifepathService
    .generatePersonality()
    .subscribe( data => this.LifePath.personality = data);
  }

  generateFriends() {
    this.lifepathService
    .generateFriends()
    .subscribe( data => this.LifePath.friends = data);
  }

  generateEnemies() {
    this.lifepathService
    .generateEnemies()
    .subscribe( data => this.LifePath.enemies = data);
  }

  saveFile() {
    this.saveFileService.SaveAsFile( 'CPRedJumpkitLifepath', this.LifePath.print());
  }

}
