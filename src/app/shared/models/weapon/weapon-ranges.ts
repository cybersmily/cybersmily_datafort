import { CombatRange } from './combat-range';

export class WeaponRanges {
    pointBlank: number;
    close: number;
    medium: number;
    long: number;
    extreme: number;

    constructor(weaponRange: number) {
        this.pointBlank = 1;
        this.close = Math.floor(weaponRange * 0.25);
        this.medium = Math.floor(weaponRange * 0.5);
        this.long = weaponRange;
        this.extreme = (weaponRange * 2);
    }

    rangeBracket(range: number): CombatRange {
        if (range >= 0 && range <= 1 ) {
            return { bracket: 'Point Blank', diff: 10};
        }
        if ( range > 1 && range <= this.close) {
            return { bracket: 'Close', diff: 15};
        }
        if ( range > this.close && range <= this.medium) {
            return { bracket: 'Medium', diff: 20};
        }
        if ( range > this.medium && range <= this.long) {
            return { bracket: 'Long', diff: 25};
        }
        if ( range > this.long && range <= this.extreme) {
            return { bracket: 'Extreme', diff: 30};
        }
        return { bracket: 'Out of range', diff: -1};
    }
}

