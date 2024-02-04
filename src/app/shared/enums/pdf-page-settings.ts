import { PdfPageOrientation } from "./pdf-page-orientation";

export enum PdfPageSettings {
  MARGIN_LEFT = 5,
  MARGIN_TOP = 10,
  MARGIN_RIGHT = 205,
  MIDPAGE = 105,
  PAGE_HEIGHT = 280,
  PAGE_WIDTH = 210,
  DEFAULT_FONT = 'Arial',
  DEFAULT_ORIENTATION = PdfPageOrientation.PORTRAIT,
  DEFAULT_FORMAT = 'a4',
  DEFAULT_UNIT = 'mm',
}

export enum PdfFontSize {
  XXS = 5,
  XS = 7,
  SM = 9,
  DEFAULT = 11,
  LG = 15,
  XL = 20,
  XXL = 25,
  XXXL = 30,
  XXXXL = 40,
}

export enum PdfLineHeight {
  XXS = 3,
  XS = 4,
  SM = 5,
  DEFAULT = 6,
  LG = 8,
  XL = 10,
  XXL = 12,
  XXXL = 18,
}
