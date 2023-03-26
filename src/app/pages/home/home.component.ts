import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: {[id: number] : number} = {1: 400, 3: 335, 4: 350}

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService){}

  onColumnsCountChange(colsNum: number): void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onShowCategory(newCategory: string): void{
    this.category = newCategory;
    this.getProducts();
    console.log(this.category);
  }

  onAddToCart(product: Product) : void{
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

  ngOnInit(){
    this.getProducts();
  }

  getProducts(): void{
    this.productSubscription =this.storeService.getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => this.products = _products);
  }

  onItemsCountChange(newCount: number) : void{
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChange(sort: string) : void{
    this.sort = sort;
    this.getProducts();
  }

  ngOnDestroy(): void {
    if(this.productSubscription){
      this.productSubscription.unsubscribe();
    }
  }

}
