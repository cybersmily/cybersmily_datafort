import SourceBook from "../../../models/sourcebook";

export interface CpRedCyberware {
  name: string;
  type: CpRedCyberwareType;
  install: string;
  description: string;
  cost: number;
  hl: string;
  avgHL: number;
  optionSlots: number;
  source: SourceBook;

}

export interface CpRedCyberwareType {
  name: string;
  foundational: string;
  optionSlots: number;
}

export interface CpRedCyberwareInstall {
  name: string;
  description: string;
  cost: number;
  surgeryDV: number;

}
