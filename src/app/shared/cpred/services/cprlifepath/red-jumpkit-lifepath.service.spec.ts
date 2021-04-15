import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../../services/file-services/data.service';
import { DiceService } from './../../../services//dice/dice.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { RedJumpkitLifepathService } from './red-jumpkit-lifepath.service';

describe('RedJumpkitLifepathService', () => {
  let service: RedJumpkitLifepathService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [DiceService, DataService],
    imports: [HttpClientModule]
  }));

  beforeEach( inject([RedJumpkitLifepathService], (svc: RedJumpkitLifepathService) => {
    service = svc;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate lifepath', (done) => {
    service.generateLifePath().subscribe(data => {
      expect(data.background).toBeTruthy();
      expect(data.goals).toBeTruthy();
      expect(data.personality).toBeTruthy();
      expect(data.romance).toBeTruthy();
      expect(data.friends).toBeTruthy();
      expect(data.enemies).toBeTruthy();
      expect(data.motivation).toBeTruthy();
      done();
    });
  });

  it('should generate background', (done) => {
    service.generateBackground().subscribe(data => {
      expect(data).toBeTruthy();
      expect(data).not.toEqual('');
      done();
    });
  });

  it('should generate goal', (done) => {
    service.generateGoals().subscribe(data => {
      expect(data).toBeTruthy();
      expect(data).not.toEqual('');
      done();
    });
  });

  it('should generate Romance', (done) => {
    service.generateRomance().subscribe(data => {
      expect(data).toBeTruthy();
      expect(data).not.toEqual('');
      done();
    });
  });

  it('should generate Motivation', (done) => {
    service.generateMotivation().subscribe(data => {
      expect(data).toBeTruthy();
      expect(data).not.toEqual('');
      done();
    });
  });

  it('should generate Personality', (done) => {
    service.generatePersonality().subscribe(data => {
      expect(data).toBeTruthy();
      expect(data).not.toEqual('');
      done();
    });
  });

  it('should generate Friends', (done) => {
    service.generateFriends().subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.length).toBeGreaterThanOrEqual(1);
      expect(data[0]).not.toEqual('');
      done();
    });
  });

  it('should generate Enemies', (done) => {
    service.generateEnemies().subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.length).toBeGreaterThanOrEqual(1);
      expect(data[0]).not.toEqual('');
      done();
    });
  });
});
