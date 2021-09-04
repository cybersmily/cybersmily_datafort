import { CombatModifier } from './combat-modifier';

export class Cp2020CombatModifiers {
    target: CombatModifier[];
    attacker: CombatModifier[];

    constructor() {
        this.target = [
            {name: 'Target immobile', mod: 4, selected: false},
            {name: 'Target dodging (melee only)', mod: -2, selected: false},
            {name: 'Moving Target REF > 10', mod: -3, selected: false},
            {name: 'Moving Target REF > 12', mod: -4, selected: false},
            {name: 'Moving Target REF > 14', mod: -5, selected: false},
            {name: 'Large target', mod: 4, selected: false},
            {name: 'Small target', mod: -4, selected: false},
            {name: 'Tiny target', mod: -6, selected: false},
            {name: 'Target silhoutted', mod: 2, selected: false},

        ];
        this.attacker = [
            {name: 'Aimed shot at body location', mod: -4, selected: false},

            {name: 'Aiming, 1 turn', mod: 1, selected: false},
            {name: 'Aiming, 2 turn', mod: 2, selected: false},
            {name: 'Aiming, 3 turn', mod: 3, selected: false},

            {name: 'Ambush', mod: 5, selected: false},
            {name: 'Blinded by light or dust', mod: -3, selected: false},
            {name: 'Fast draw/snapshot', mod: -3, selected: false},
            {name: 'Firing while running', mod: -3, selected: false},
            {name: 'Ricochet or indirect fire', mod: -5, selected: false},
            {name: 'Firing shoulder arm from hip', mod: -2, selected: false},
            {name: 'Turning to face target', mod: -2, selected: false},
            {name: 'Using two weapons', mod: -3, selected: false},

            {name: 'Full Auto, Close', mod: 1, selected: false},
            {name: 'Full Auto, all other', mod: 0, selected: false},
            {name: 'Three Round Burst (Close/Medium only)', mod: 3, selected: false},

            {name: 'Laser sight', mod: 1, selected: false},
            {name: 'Smartgun', mod: 2, selected: false},
            {name: 'Smartgoggles', mod: 2, selected: false},
            {name: 'Telescopic sight, extreme range', mod: 2, selected: false},
            {name: 'Telescopic sight, long range', mod: 1, selected: false},
            {name: 'Targeting scope', mod: 1, selected: false},

            {name: 'Turret mounted weapon', mod: 2, selected: false},
            {name: 'Vehicle mounted, no turret', mod: -4, selected: false}
        ];
    }

    get targetTotals(): number {
      const total = this.target.reduce( ((a, b) => a + ((b.selected) ? b.mod : 0)), 0 );
      return (total) ? total : 0;
    }

    get attackerTotals(): number {
      return this.attacker.reduce( ((a, b) => a + ((b.selected) ? b.mod : 0)), 0 );
    }

    get totalModifiers(): number {
      return this.targetTotals + this.attackerTotals;
    }

    toggleTargetMod(index: number) {
      this.target[index].selected = !this.target[index].selected;
    }

    toggleAttackerMod(index: number) {
      this.attacker[index].selected = !this.attacker[index].selected;
    }
}
