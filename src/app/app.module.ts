import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CartPage } from './pages/cart.page';
import { ProductListPage } from './pages/product-list.page';
import { ProductDetailsPage } from './pages/product-details.page';
import { NavbarComponent } from './components/navbar.component';

const routes: Route[] = [
  {
    path: '',
    component: ProductListPage,
  },
  {
    path: 'products/:id',
    component: ProductDetailsPage,
  },
  {
    path: 'cart',
    component: CartPage,
  },
];


@NgModule({
  declarations: [
    AppComponent,
    CartPage,
    ProductDetailsPage,
    ProductListPage,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
