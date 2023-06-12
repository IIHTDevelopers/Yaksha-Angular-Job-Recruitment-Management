import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../model/product";
@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "http://127.0.0.1:8081/e-commerce/api/products";

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<void> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put<void>(url, product);
  }
  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  searchProducts(
    name: string,
    price: number,
    category: string
  ): Observable<Product[]> {
    let params = new HttpParams();
    if (name) {
      params = params.set("name", name);
    }
    if (price) {
      params = params.set("price", price.toString());
    }
    if (category) {
      params = params.set("category", category);
    }
    return this.http.get<Product[]>(this.apiUrl + "/search", { params });
  }
}
