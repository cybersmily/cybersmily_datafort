export interface CmbtZoneBlock {
  numOfBuildings: number;
  buildings: Array<CmbtZoneBuilding>;
  cityBlocks: Array<CmbtZoneRect>;
  rects: Array<CmbtZoneRect>;
  polygons: Array<CmbtZonePolygon>;
  paths: Array<CmbtZonePath>;
  texts: Array<CmbtZoneText>;
}

export enum CmbtZoneBuildingType {
  RECT,
  POLYGON
}

export interface CmbtZoneBuilding {
  type: CmbtZoneBuildingType;
  x: number;
  y: number;
  ht: number;
  wd: number;
  stories: number;
  label: string;
}

export interface CmbtZoneBlock {
  path: string;
}

export interface CmbtZoneRect {
  x: number;
  y: number;
  height: number;
  width: number;
}
export interface CmbtZonePolygon {
  height: number;
  width: number;
  points: string;
}
export interface CmbtZonePath {
  d: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
  x: number;
  y: number;
}

export interface CmbtZoneText {
  x: number;
  y: number;
  text: string;
}
