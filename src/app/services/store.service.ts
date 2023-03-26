import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getAllProducts(limit = '12', sort = 'desc', categories? : string): Observable<Array<Product>>{
    if (categories === undefined){
      return this.http.get<Array<Product>>(
        STORE_BASE_URL + '/products?sort=' + sort + '&limit=' +limit
      )
    }else{
      return this.http.get<Array<Product>>(
        STORE_BASE_URL + '/products/category/' + categories+ '?sort=' + sort + '&limit=' +limit 
        )
    }
    
  }

  getAllCategories(): Observable<Array<string>>{
    return this.http.get<Array<string>>(STORE_BASE_URL + '/products/categories');
  }
}
