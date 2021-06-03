export class CPRedPriceCategoryLookup {
  static CPRED_CHEAP: string = 'Cheap';
  static CPRED_EVERYDAY: string = 'Everyday';
  static CPRED_COSTLY: string = 'Costly';
  static CPRED_PREMIUM: string = 'Premium';
  static CPRED_EXPENSIVE: string = 'Expensive';
  static CPRED_VERY_EXPENSIVE: string = 'Very Expensive';
  static CPRED_LUXURY: string = 'Luxury';
  static CPRED_SUPER_LUXURY: string = 'Super Luxury';
  static CPRED_NA: string = 'NA';


  /**
   * get the price category of the eb
   *
   * @static
   * @param {number} eb
   * @return {*}  {string}
   * @memberof CPRedPriceCategoryLookup
   */
  static priceCategoryLookup(eb: number): string {
    if (eb < 1) {
      return this.CPRED_NA;
    }
    if (eb > 0 && eb <= 10) {
      return this.CPRED_CHEAP;
    }
    if (eb > 10 && eb <= 20) {
      return this.CPRED_EVERYDAY;
    }
    if (eb > 20 && eb <= 50) {
      return this.CPRED_COSTLY;
    }
    if (eb > 50 && eb <= 100) {
      return this.CPRED_PREMIUM;
    }
    if (eb > 100 && eb <= 500) {
      return this.CPRED_EXPENSIVE;
    }
    if (eb > 500 && eb <= 1000) {
      return this.CPRED_VERY_EXPENSIVE;
    }
    if (eb > 1000 && eb <= 5000) {
      return this.CPRED_LUXURY;
    }
    if (eb > 5000) {
      return this.CPRED_SUPER_LUXURY;
    }
  }

  /**
   * Get the default eb for a price category
   *
   * @static
   * @param {string} category
   * @return {*}  {number}
   * @memberof CPRedPriceCategoryLookup
   */
  static marketPriceLookup(category: string): number {
    switch(category){
      case this.CPRED_CHEAP:
        return 10;
      case this.CPRED_EVERYDAY:
        return 20;
      case this.CPRED_COSTLY:
        return 50;
      case this.CPRED_PREMIUM:
        return 100;
      case this.CPRED_EXPENSIVE:
        return 500;
      case this.CPRED_VERY_EXPENSIVE:
        return 1000;
      case this.CPRED_LUXURY:
        return 5000;
      case this.CPRED_SUPER_LUXURY:
        return 10000;
      default:
        return 0;
    }
  }
}
