import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/products';

@Injectable({
  providedIn: 'root'
})
export class ProdutcsService {
  baseUrl = 'http://localhost:4201';
  constructor(private http:HttpClient) {}

  get(){
    return this.http.get<Product[]>(`${this.baseUrl}/products`)
  }
  getProduct(id:number){
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`)
  }
}
