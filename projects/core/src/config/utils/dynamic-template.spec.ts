import { DynamicTemplate } from './dynamic-template';

describe('DynamicTemplate', () => {
  describe('No variables in String', () => {
    it('should return template string', () => {
      const url = '/xxx/xxx';
      const result = DynamicTemplate.resolve(url, { id: '123' });
      expect(result).toEqual(url);
    });
  });

  describe('No variables in Values', () => {
    it('should return template string', () => {
      const url = '/xxx/xxx/${id}';
      const result = DynamicTemplate.resolve(url, {});
      expect(result).toEqual(url);
    });
  });

  describe('Correct variables in String and Values', () => {
    it('should return template string with value', () => {
      const url = '/xxx/xxx/${id}';
      const id = 123;
      const result = DynamicTemplate.resolve(url, { id });
      expect(result).toEqual(`/xxx/xxx/${id}`);
    });
  });

  describe('Wrong variables in String and Values', () => {
    it('should return template string with value', () => {
      const url = '/xxx/xxx/${id}';
      const productId = 123;
      const result = DynamicTemplate.resolve(url, { productId });
      expect(result).toEqual(url);
    });
  });

  describe('Path validation', () => {
    it('should not allow path traversal', () => {
      expect(DynamicTemplate.isValidUrl('../../../index.html')).toBeFalsy();
      expect(
        DynamicTemplate.isValidUrl('product/89890?fields=../../../index.html')
      ).toBeFalsy();
    });
    it('should not allow valid urls', () => {
      expect(
        DynamicTemplate.isValidUrl('/authorizationserver/oauth/token')
      ).toBeTruthy();
      expect(
        DynamicTemplate.isValidUrl(
          'products/1234/references?fields=DEFAULT,references(target(images(FULL))'
        )
      ).toBeTruthy();
      expect(
        DynamicTemplate.isValidUrl(
          'products/search?fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating),facets,breadcrumbs,pagination(DEFAULT),sorts(DEFAULT),freeTextSearch'
        )
      ).toBeTruthy();
    });
  });
});
