export interface CpRedLifepathCoreData {
  culture: [
    {
      "name": "North American",
      "languages": [
        "Chinese",
        "Cree",
        "Creole",
        "English",
        "French",
        "Navajo",
        "Spanish"
      ]
    },
    {
      "name": "South/Central American",
      "languages": [
        "Creole",
        "English",
        "German",
        "Guarani",
        "Mayan",
        "Portuguese",
        "Quechua",
        "Spanish"
      ]
    },
    {
      "name": "Western European",
      "languages": [
        "Dutch",
        "English",
        "French",
        "German",
        "Italian",
        "Norwegian",
        "Portuguese",
        "Spanish"
      ]
    },
    {
      "name": "Eastern European",
      "languages": [
        "English",
        "Finnish",
        "Polish",
        "Romanian",
        "Russian",
        "Ukrainian"
      ]
    },
    {
      "name": "Middle Eastern/North African",
      "languages": [
        "Arabic",
        "Berber",
        "English",
        "Farsi",
        "French",
        "Hebrew",
        "Turkish"
      ]
    },
    {
      "name": "Sub-Saharan African",
      "languages": [
        "Arabic",
        "English",
        "French",
        "Hausa",
        "Lingala",
        "Oromo",
        "Portuguese",
        "Swahili",
        "Twi",
        "Yoruba"
      ]
    },
    {
      "name": "South African",
      "languages": [
        "Bengali",
        "Dari",
        "English",
        "Hindi",
        "Nepali",
        "Sinhalese",
        "Tamil",
        "Urdu"
      ]
    },
    {
      "name": "South East Asian",
      "languages": [
        "Arabic",
        "Burmese",
        "English",
        "Filipino",
        "Hindi",
        "Indonesian",
        "Khmer",
        "Malayan",
        "Vietnamese"
      ]
    },
    {
      "name": "East Asian",
      "languages": [
        "Cantonese Chinese",
        "English",
        "Japanese",
        "Korean",
        "Mandarin Chinese",
        "Mongolian"
      ]
    },
    {
      "name": "Oceania/Pacific Islander",
      "languages": [
        "English",
        "French",
        "Hawaiian",
        "Maori",
        "Pama-Nyungan",
        "Tahitian"
      ]
    }
  ],
  personality: Array<string>;
  clothing: Array<string>;
  hairstyle: Array<string>;
  affectation: Array<string>;
  valueMost: Array<string>;
  feelAboutPeople: Array<string>;
  valuedPerson: Array<string>;
  valuedPossesion: Array<string>;
  originalBackground: Array<string>;
  childhoodEnvironment: Array<string>;
  familyCrisis: Array<string>;
  goals: Array<string>;
  friends: Array<string>;
  enemies: Array<string>;
  enemyReason:Array<string>;
  enemyResources: Array<string>;
  enemyReaction: Array<string>;
  romance: Array<string>;
  roles: Array<CpRedLifepathCoreRoleChartEntry>;
}

export interface CpRedLifepathCoreRoleChartEntry {
  role: string;
  charts: Array<string>;
  param?: Array<CpRedLifepathCoreRoleCharParam>;
  type: CpRedLifepathCoreRoleChartItem;
}
export interface CpRedLifepathCoreRoleChartItem {
    name: string;
    chart: Array<string>;
}
export interface CpRedLifepathCoreRoleCharParam {
  name: string;
  display: string;
  options?: Array<string>;
}
