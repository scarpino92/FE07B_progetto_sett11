import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/products';
import { ProdutcsService } from '../produtcs.service';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="container d-flex justify-content-center mt-3 p-3">
      <div class="row">
        <div class="col">
          <div
            *ngFor="let product of products"
            class="card m-3 text-white"
            style="width: 18rem;"
          >
            <div class="card-body bg-dark rounded">
              <h5 class="card-title text-warning fs-4">
                {{ product.name }} <i class="bi bi-phone"></i>
              </h5>
              <p *ngIf="product.description" class="card-text fs-5">
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
