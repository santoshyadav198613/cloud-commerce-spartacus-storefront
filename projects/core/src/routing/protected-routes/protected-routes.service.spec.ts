import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RoutingConfig } from '../configurable-routes/config/routing-config';
import { ProtectedRoutesGuard } from './protected-routes.guard';
import { ProtectedRoutesService } from './protected-routes.service';

fdescribe('ProtectedRoutesService', () => {
  let service: ProtectedRoutesService;

  function beforeEachWithConfig(routingConfig: RoutingConfig['routing']) {
    const mockConfig: RoutingConfig = {
      routing: routingConfig,
    };

    TestBed.configureTestingModule({
      providers: [
        ProtectedRoutesGuard,
        {
          provide: RoutingConfig,
          useValue: mockConfig,
        },
      ],
    });

    service = TestBed.get(ProtectedRoutesService as Type<
      ProtectedRoutesService
    >);
  }

  describe('isUrlProtected', () => {
    describe(`when global protection is enabled and individual url's protection is undefined`, () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {
            login: { paths: ['login'] },
          },
        });
      });

      it('should return true', () => {
        expect(service.isUrlProtected(['login'])).toBe(true);
      });
    });

    describe('when global protection is disabled and individual url is protected', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: false,
          routes: {
            login: { paths: ['login'], protected: true },
          },
        });
      });

      it('should return false', () => {
        expect(service.isUrlProtected(['login'])).toBe(false);
      });
    });

    describe('when global protection is enabled and when individual url is protected', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {
            login: { paths: ['login'], protected: true },
          },
        });
      });

      it('should return true', () => {
        expect(service.isUrlProtected(['login'])).toBe(true);
      });
    });

    describe('when global protection is enabled and individual url is NOT protected', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {
            login: { paths: ['login'], protected: false },
          },
        });
      });

      it('should return false', () => {
        expect(service.isUrlProtected(['login'])).toBe(false);
      });
    });

    describe('when global protection is enabled and two urls are NOT protected', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {
            login: { paths: ['login'], protected: false },
            cart: { paths: ['cart'] },
            register: { paths: ['register'], protected: false },
          },
        });
      });

      it('should return false for each of them', () => {
        expect(service.isUrlProtected(['login'])).toBe(false);
        expect(service.isUrlProtected(['cart'])).toBe(true);
        expect(service.isUrlProtected(['register'])).toBe(false);
      });
    });

    describe('when global protection is enabled and not-protected url has params', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {
            product: {
              paths: ['product/:productName/:productCode'],
              protected: false,
            },
          },
        });
      });

      it('should return false for each of aliases', () => {
        expect(service.isUrlProtected(['product', '1234'])).toBe(true);
        expect(service.isUrlProtected(['product', 'camera', '1234'])).toBe(
          false
        );
        expect(
          service.isUrlProtected(['product', 'camera', '1234', 'test-test'])
        ).toBe(true);
      });
    });

    describe('when global protection is enabled and not-protected url has route aliases', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {
            product: {
              paths: [
                'product/:productCode',
                'product/:productName/:productCode',
              ],
              protected: false,
            },
          },
        });
      });

      it('should return false for each of aliases', () => {
        expect(service.isUrlProtected(['product', '1234'])).toBe(false);
        expect(service.isUrlProtected(['product', 'camera', '1234'])).toBe(
          false
        );
        expect(
          service.isUrlProtected(['product', 'camera', '1234', 'test-test'])
        ).toBe(true);
      });
    });
  });
});
