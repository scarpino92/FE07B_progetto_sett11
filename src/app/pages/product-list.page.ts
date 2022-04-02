import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/products';
import { ProdutcsService } from '../produtcs.service';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="container mt-3 p-3">
      <div class="row mt-4">
        <div class="col">
          <h1 class="text-center text-warning">I nostri prodotti</h1>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col d-flex flex-row justify-content-center">
          <div
            *ngFor="let product of products"
            class="m-3 text-white rounded bg-dark"
            style="width: 18rem;"
          >
            <div class="card-body text-center">
              <h5 class="card-title text-center text-warning fs-4">
                {{ product.name }} <i class="bi bi-phone"></i>
              </h5>
              <p *ngIf="product.description" class="card-text fs-5 align-text-justify">
                {{ product.description }}
              </p>
              <a
                class="btn btn-warning fs-5"
                [routerLink]="['/products', product.id]"
                >Dettagli</a
              >
            </div>
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
export class ProductListPage implements OnInit {
  products: Product[] | undefined;
  sub!: Subscription;
  @Input() product!: Product;

  constructor(private productSrv: ProdutcsService) {}

  ngOnInit(): void {
    this.sub = this.productSrv.get().subscribe((products) => {
      this.products = products;
      console.log(this.products);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
