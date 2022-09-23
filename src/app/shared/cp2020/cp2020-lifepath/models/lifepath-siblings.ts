import { Sibling } from './lifepath-sibling';

export class Siblings {
  siblings: Sibling[];

  constructor(param?: any) {
    this.siblings =
      param && param.siblings ? param.siblings : new Array<Sibling>();
  }

  getBrothersCount(): number {
    return this.getGenderCount('brother');
  }

  getSistersCount(): number {
    return this.getGenderCount('sister');
  }

  getSibCount(): number {
    return this.getGenderCount('') + this.getGenderCount('sib');
  }

  count(): number {
    return this.siblings.length;
  }

  getSameAgeCount(): number {
    let count = 0;
    count = this.siblings.filter(function (s, i, a) {
      return s.age === 'same';
    }).length;
    return count;
  }
  getDescription(): string {
    if (this.siblings.length < 1) {
      return 'You are an only child';
    }
    let results = this.siblings.length + ' siblings: ';
    const twinCount = this.getSameAgeCount();
    this.siblings.forEach((sibling, i) => {
      let age = sibling.age;
      if (sibling.age === 'same') {
        switch (twinCount) {
          case 1:
            age = 'twin';
            break;
          case 2:
            age = 'triplet';
            break;
          case 3:
            age = 'quadruplet';
            break;
          case 4:
            age = 'quintuplet';
            break;
          case 5:
            age = 'sextuplet';
            break;
          case 6:
            age = 'septuplet';
            break;
          default:
            age = 'tuplet';
        }
      }
      results += `${age} ${sibling.gender} [${sibling.feeling}]`;
      if (i < this.siblings.length - 1) {
        results += ', ';
      }
    });
    return results;
  }
  getGenderCount(gender: string): number {
    let siblingCount = 0;
    this.siblings.forEach((sib) => {
      if (sib.gender === gender) {
        siblingCount++;
      }
    });
    return siblingCount;
  }
}
