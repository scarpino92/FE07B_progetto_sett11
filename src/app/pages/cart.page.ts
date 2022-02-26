import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '../models/products';

@Component({
  selector: 'app-cart',
  template: `
    <div class="container d-flex justify-content-center">
      <div class="row">
        <div class="col">
          <ng-container *ngIf="cart && cart.length > 0; else cVuoto">
            <h1 class="text-center">
              <i class="bi bi-cart-check-fill"></i>Carrello
            </h1>
            <div class="bg-dark text-white p-4 rounded">
              <h2>I tuoi articoli</h2>
              <div class="list-group text-dark fs-5 fw-bold">
                <span
                  class="list-group-item d-flex align-items-center justify-content-between"
                  *ngFor="let item of cart"
                >
                  {{ item.name }}
                  <span class="bg-warning rounded">{{
                    item.price | currency: 'EUR'
                  }}</span>
                </span>
              </div>
              <h2 class="mt-2">Completa l'ordine</h2>
              <form #form="ngForm" (ngSubmit)="submit(form)">
                <div class="form-group fs-4 my-2">
                  <label for="nome"> Nome </label>
                  <input
                    ngModel
                    id="nome"
                    type="text"
                    class="d-flex justify-content-end"
                  />
                </div>
                <div class="form-group fs-4 my-2">
                  <label for="indirizzo"> Indirizzo </label>
                  <input
                    ngModel
                    id="indirizzo"
                    type="text"
                    class="d-flex justify-content-end"
                  />
                </div>
                <button class="btn btn-warning m-3 fs-5" type="submit">
                  Acquista
                </button>
              </form>
            </div>
          </ng-container>
          <ng-template #cVuoto>
            <h2 class="text-center fs-1 mt-5">
              <i class="bi bi-cart3"></i> Il carrello è vuoto
            </h2>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      * {
        font-family: 'ZCOOL QingKe HuangYou', cursive;
      }
    `,
  ],
})
export class CartPage implements OnInit {
  cart: Product[] | undefined;
  sub!: Subscription;

  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.CartService.getItems();
    this.sub = this.CartService.subject.subscribe((tot) => {
      if (tot == 0) {
        this.cart = undefined;
      }
    });
  }

  submit(f: NgForm) {
    console.log(f.value);
    alert(
      `Il tuo ordine è stato inviato con successo! ✅ \n Numero Ordine: #00${Math.floor(
        Math.random() * 10001
      )}`
    );
    this.CartService.clearCart();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
