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

  LifePathData: CPRedLifepathData;
  enabled = false;
  LifePath = new CPRedLifepath();
  background = '';

  constructor(private lifepathService: RedJumpkitLifepathService,
              private saveFileService: SaveFileService) {}

  ngOnInit() {
    this.lifepathService.GetLifePathData().subscribe( data => {
      this.enabled = true;
      this.LifePathData = data;
    });
  }

  generate() {
    this.generateBackground();
    this.generateEnemies();
    this.generateFriends();
    this.generateGoals();
    this.generateMotivation();
    this.generatePersonality();
    this.generateRomance();
  }

  generateBackground() {
    this.LifePath.background = this.lifepathService.GenerateBackground();
  }

  generateMotivation() {
    this.LifePath.motivation = this.lifepathService.GenerateMotivation();
  }

  generateGoals() {
    this.LifePath.goals = this.lifepathService.GenerateGoals();
  }

  generateRomance() {
    this.LifePath.romance = this.lifepathService.GenerateRomance();
  }

  generatePersonality() {
    this.LifePath.personality = this.lifepathService.GeneratePersonality();
  }

  generateFriends() {
    this.LifePath.friends = this.lifepathService.GenerateFriends();
  }

  generateEnemies() {
    this.LifePath.enemies = this.lifepathService.GenerateEnemies();
  }

  saveFile() {
    this.saveFileService.SaveAsFile( 'CPRedJumpkitLifepath', this.LifePath.print());
  }

}
