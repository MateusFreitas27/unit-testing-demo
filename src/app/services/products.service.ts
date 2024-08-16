import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseAPI = environment.baseAPI;
  constructor(private http: HttpClient) {}

  /**
   * Retorna uma lista de produtos.
   * @returns Uma requisição HTTP GET para a rota '/products' do servidor.
   */
  getProducts() {
    return this.http.get<Product[]>(`${this.baseAPI}products`);
  }

  /**
   * Salva um produto.
   *
   * @param product - O objeto do produto a ser salvo.
   * @returns Uma Promise que resolve para o objeto do produto salvo.
   */
  saveProduct(product: Product) {
    return this.http.post<Product>(
      `${this.baseAPI}products`,
      product
    );
  }

  /**
   * Deleta um produto pelo seu ID.
   *
   * @param id O ID do produto a ser deletado.
   * @returns Uma requisição HTTP para deletar o produto.
   */
  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.baseAPI}products/${id}`);
  }

  /**
   * Atualiza um produto.
   *
   * @param product - O objeto do produto a ser atualizado.
   * @returns Uma requisição HTTP PUT para atualizar o produto.
   */
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${this.baseAPI}products/${product.id}`,
      product
    );
  }
}
