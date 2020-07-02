import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms'; 
import { NgModule, Injector } from '@angular/core';
import {createCustomElement} from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';
import { ProductSearchComponent } from './product-search/product-search.component';

@NgModule({
  declarations: [
    ProductSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
 
})
export class AppModule { 
  constructor(injector: Injector) {
    const customProductSearchElement = createCustomElement(ProductSearchComponent,{injector});
    customElements.define('app-product-search', customProductSearchElement);
  }
  ngDoBootstrap() {}
}
