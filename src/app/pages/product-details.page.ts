import { Product } from './../models/products';
import { Component, OnInit} from '@angular/core';
import { ProdutcsService } from '../produtcs.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  template: `
    <div class="container d-flex justify-content-center my-3 p-3">
      <div class="row">
        <div class="col">
          <h1 class="text-center text-warning my-4">Dettaglio del prodotto</h1>
          <div *ngIf="product" class="rounded bg-dark text-white p-3">
            <h3 class="text-warning">{{ product.name }} <i class="bi bi-phone"></i></h3>
            <h4>{{ product.price | currency: 'EUR'}}</h4>
            <p class="fs-5">{{ product.description }}</p>
            <button
              class="btn btn-warning fs-5"
              type="button"
              (click)="addToCart()"
            >
              Aggiungi al carrello
            </button>
          </div>
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
export class ProductDetailsPage implements OnInit {
  product: Product | undefined;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProdutcsService
  ) {}

  addItems(product: Product) {
    this.cartService.addItems(product);
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const id = +params['id'];
      this.product = await this.productsService.getProduct(id).toPromise();
    });
  }

  addToCart() {
    this.cartService.addItems(this.product as Product);
  }
}
