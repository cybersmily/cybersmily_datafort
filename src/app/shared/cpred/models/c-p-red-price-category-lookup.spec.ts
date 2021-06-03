import { CPRedPriceCategoryLookup } from './c-p-red-price-category-lookup';

describe('CPRedPriceCategoryLookup', () => {
  it('should create an instance', () => {
    expect(new CPRedPriceCategoryLookup()).toBeTruthy();
  });

  it('should get cheap category', () => {
    expect(CPRedPriceCategoryLookup.priceCategoryLookup(10)).toEqual(CPRedPriceCategoryLookup.CPRED_CHEAP);
    expect(CPRedPriceCategoryLookup.priceCategoryLookup(1)).toEqual(CPRedPriceCategoryLookup.CPRED_CHEAP);
  });

  it('should get luxury default price', () => {
    expect(CPRedPriceCategoryLookup.marketPriceLookup(CPRedPriceCategoryLookup.CPRED_LUXURY)).toEqual(5000);
    expect(CPRedPriceCategoryLookup.marketPriceLookup('test')).toEqual(0);
  });
});
