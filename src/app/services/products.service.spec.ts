import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Product 1',
        description: 'Description 1',
        price: '9.99',
        category: 'Category 1'
      },
      {
        id: '2',
        title: 'Product 2',
        description: 'Description 2',
        price: '14.99',
        category: 'Category 2'
      }
    ];

    service.getProducts().subscribe((response) => {
      expect(response).toEqual(mockProducts);
    });

    const req = httpController.expectOne(`https://fakestoreapi.com/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should test saveProducts', () => {
    const product: Product = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      price: '19.99',
      category: 'Test category'
    };
    service.saveProduct(product).subscribe((response) => {
      expect(response).toEqual(product);
    });

    const req = httpController.expectOne(`https://fakestoreapi.com/products`);
    expect(req.request.method).toBe('POST');
    req.flush(product);
  });
  
  it('should test updateProduct', () => {
    const product: Product = {
      id: '1',
      title: 'Updated Product',
      description: 'Updated description',
      price: '29.99',
      category: 'Updated category'
    };
    const updatedProduct: Product = {
      id: '1',
      title: 'Updated Product',
      description: 'Updated description',
      price: '29.99',
      category: 'Updated category'
    };
    service.updateProduct(product).subscribe((response) => {
      expect(response).toEqual(updatedProduct);
    });

    const req = httpController.expectOne(`https://fakestoreapi.com/products/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);
  });

  it('should test deleteProduct', () => {
    const product: Product = {
      id: '1',
      title: 'Product 1',
      description: 'Description 1',
      price: '9.99',
      category: 'Category 1'
    };
    service.deleteProduct(Number(product.id)).subscribe((response) => {
      expect(response).toEqual(product);
    });

    const req = httpController.expectOne(`https://fakestoreapi.com/products/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(product);
  });
});
