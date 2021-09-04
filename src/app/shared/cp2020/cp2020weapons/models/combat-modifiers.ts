import { CombatModifier } from './combat-modifier';
export interface CombatModifiers {
  targetMovement: CombatModifier[];
  targetSize: CombatModifier[];
  fireMode:  CombatModifier[];
  aiming: CombatModifier[];
  scopes: CombatModifier[];
  attacker: CombatModifier[];
  mounted:  CombatModifier[];
  other:  CombatModifier;
}

