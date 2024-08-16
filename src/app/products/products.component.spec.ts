import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  let dialog = jasmine.createSpyObj('MatDialog', ['open']);
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'getProducts',
    'deleteProduct',
  ]);

  mockProductService.getProducts.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [SharedModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: MatDialog, useValue: dialog },
        { provide: ProductsService, useValue: mockProductService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should test get products initially', () => {
    it('should get product data initially', () => {
       // Arrange
       const mockProductData: Product[] = [
        { id: '1', title: 'Product 1', price: '10', description: 'Description 1', category: 'Category 1' },
        { id: '2', title: 'Product 2', price: '20', description: 'Description 2', category: 'Category 2' },
      ];
      mockProductService.getProducts.and.returnValue(of(mockProductData));

      // Act
      component.getProducts();

      // Assert
      expect(component.productData).toEqual(mockProductData);
      expect(component.showSpinner).toBe(false);
    });

    it('should get product data initially on failure', () => {
      // Arrange
      const error = new Error('Error while update a product');
      mockProductService.getProducts.and.returnValue((throwError(() => error)));

      // Act
      component.getProducts();

      // Assert
      expect(component.showSpinner).toBe(false);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000,
      });
    });
  });

  it('should test openDialog', () => {
    // Act
    component.openDialog();

    // Assert
    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
      width: '40%',
    });
  });

  it('should test editDialog', () => {
    // Arrange
    const product: Product = {
      id: '1',
      title: 'Product 1',
      price: '10',
      description: 'Description 1',
      category: 'Category 1',
    };

    // Act
    component.editProduct(product);

    // Assert
    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
      data: product,
      width: '40%',
    });
  });

  describe('should test deleteProduct', () => {
    it('should test deleteProduct on success', () => {
      // Arrange
      const product: Product = {
        id: '1',
        title: 'Product 1',
        price: '10',
        description: 'Description 1',
        category: 'Category 1',
      };
      mockProductService.deleteProduct.and.returnValue(of({ status: 200, message: 'Deletado com sucesso!...' }));

      // Act
      component.deleteProduct(product);

      // Assert
      expect(mockProductService.deleteProduct).toHaveBeenCalledWith('1');
      expect(matSnackBar.open).toHaveBeenCalledWith('Deletado com sucesso!...', '', {
        duration: 3000,
      });
    });

    it('should test deleteProduct on failure', () => {
      // Arrange
      const product: Product = {
        id: '1',
        title: 'Product 1',
        price: '10',
        description: 'Description 1',
        category: 'Category 1',
      };
      const error = new Error('Algo deu errado!...');
      mockProductService.deleteProduct.and.returnValue(throwError(() => error));

      // Act
      component.deleteProduct(product);

      // Assert
      expect(matSnackBar.open).toHaveBeenCalledWith('Algo deu errado!...', '', {
        duration: 3000,
      });
    });
  });
});
