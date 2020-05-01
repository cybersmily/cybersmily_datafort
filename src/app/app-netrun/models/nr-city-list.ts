import { NRCity } from './nr-city';

export class NrCityList {
    list: NRCity[];

    constructor() {
        this.list = new Array<NRCity>();
    }

  /**
   * Initiates the city list from the json file
   * and sort the list based on the city name.
   * @private
   * @param {*} citiesObj - json obj of cities
   * @returns a sorted list of NRCity objects
   * @memberof NrMapService
   */
  InitiateCityList(citiesObj: Array<NRCity>) {
    this.list = citiesObj;
    this.list.sort( (a, b) => {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      if ( x < y ) { return -1; }
      if ( x > y ) { return 1; }
      return 0;
    });
  }

    /**
   * GetCity - Gets a city from the available cities.
   * @param {string} cityName - name of the city to search for
   * @returns NRCity object
   * @memberof NrMapService
   */
  GetCity( cityName: string): NRCity {
    return this.list.find( city => city.name === cityName);
  }

    /**
   * GetCitiesForRegion retrieves all the cities from the city list
   * that are within the passed in region.
   *
   * @param {string} regionName - region name to filter on.
   * @returns list of fitler NRCity objects.
   * @memberof NrMapService
   */
  GetCitiesForRegion( regionName: string ): NRCity[] {
    const cities = this.list.filter( city => city.region === regionName && city.map);
    cities.unshift({name: '', region: 'World', security: 0, trace: 0, controlby: '', world: false });
    return cities;
  }
}
