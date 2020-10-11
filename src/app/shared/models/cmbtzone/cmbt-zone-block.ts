export interface CmbtZoneBlock {
  numOfBuildings: number;
  rects: Array<CmbtZoneRect>;
  paths: Array<CmbtZonePath>;
  texts: Array<CmbtZoneText>;
}

export interface CmbtZoneRect {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface CmbtZonePath {
  d: string;
}

export interface CmbtZoneText {
  x: number;
  y: number;
  text: string;
}
