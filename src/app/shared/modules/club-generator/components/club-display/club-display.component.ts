import { ClubNameGeneratorService } from './../../services/clubb-name-generator/club-name-generator.service';
import { first, last, take, takeLast, forkJoin } from 'rxjs';
import { Club } from './../../models/club';
import { ClubGeneratorService } from './../../services';
import { faDice, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-club-display',
  templateUrl: './club-display.component.html',
  styleUrls: ['./club-display.component.css'],
})
export class ClubDisplayComponent implements OnInit {
  faDice = faDice;
  faTrash = faTrash;

  clubs: Array<Club>;

  count: number = 1;

  constructor(
    private clubGenerator: ClubGeneratorService,
    private clubNameGenerator: ClubNameGeneratorService
  ) {}

  ngOnInit(): void {}

  rollClubs(): void {
    const clubGenerator = this.clubGenerator
      .generateClub(this.count)
      .pipe(first());
    const nameGenerator = this.clubNameGenerator
      .generateNames(this.count)
      .pipe(first());
    forkJoin([clubGenerator, nameGenerator]).subscribe((data) => {
      this.clubs = data[0].map((club, index) => {
        club.name = data[1][index];
        return club;
      });
    });
  }

  deleteClub(index: number): void {}
}
