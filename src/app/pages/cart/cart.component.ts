import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit{

  cart: Cart = { items: []};

  dataSource: Array<CartItem> = [];
  displayedColumns : Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private cartService: CartService, private http: HttpClient){}

  ngOnInit(){
    
    this.cartService.cart.subscribe((_cart) =>{
      this.cart = _cart;
      this.dataSource = this.cart.items; 
    })
  }

  getTotal(items: Array<CartItem>): number{
    return items
          .map(item => item.price * item.quantity)
          .reduce((prev,current) => prev+ current, 0)
  }

  onClearCart(): void{
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void{
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void{
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void{
    this.cartService.removeToCart(item);
  }

  onCheckOut(): void{
    this.http.post(
      'http://localhost:4242/checkout',{
        items: this.cart.items
      }
    ).subscribe(async(res: any) =>{
      let stripe = await loadStripe('pk_test_51MpxioCxPotE5mjKfIhHytvCdWPFTcW62eHVKbazXOttY77yHKBcKZLRYyvDAo3bMz0Xfxre0I0n3mLBKvkiodER00xHpWnACc');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }

}
