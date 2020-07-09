import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductSearchService } from '../product-search.service';
import { Product } from '../models/product';

@Component({
  //selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  public errorMsg;
  public rowData : Product[] = [];
  public selectedProducts : string[]= [];
  public selectedProductDetails :Product[] = [];
  public selectedProductConsolidatedDetails :string = '';
  clickMessage = '';
  public productName = '';
  public productModel = new Product();
  public noresultsMatchingCriteriaMsg = '';
  @Output() shoppingCartDisplayEventEmitter = new EventEmitter();
  
  constructor(private productSearchService: ProductSearchService) { }

  ngOnInit(): void {
    
  }
 
  productSearch() {
   // alert("product name is: "+this.productModel.name);
   this.rowData = [];
   this.selectedProducts = [];
   this.selectedProductDetails = [];
   this.selectedProductConsolidatedDetails = '';
    this.productName = this.productModel.name;
    this.clickMessage = 'Wow binding!';
    if(this.productName != '' && this.productName != undefined){
     // alert('making ajax call');
     this.productSearchService.getProductsByName(this.productName).subscribe(data => this.rowData = data,
        error => this.errorMsg = error,() => {
          if(this.rowData != null && this.rowData.length > 0){
              //this.clickMessage = JSON.stringify(this.rowData[0]);
          }else{
            
            this.noresultsMatchingCriteriaMsg = "There are no products matching this name";
          }
          
        });
    }
    
  }   

  addToCart(){
 // alert("selected product details:"+this.selectedProducts);
  this.selectedProductConsolidatedDetails = '';
  this.selectedProductDetails.forEach((detail) => {
    //alert("detail: "+JSON.stringify(detail));
    let productDetailString = JSON.stringify(detail);
    this.selectedProductConsolidatedDetails = this.selectedProductConsolidatedDetails + " \n " + productDetailString;
  });
  this.shoppingCartDisplayEventEmitter.emit(this.selectedProductConsolidatedDetails);
  //alert("selectedProductConsolidatedDetails: "+this.selectedProductConsolidatedDetails);
  }

  clearResults(){
    this.noresultsMatchingCriteriaMsg = '';
    this.rowData = [];
    this.productModel.name='';
    this.selectedProducts = [];
    this.selectedProductDetails = [];
   this.selectedProductConsolidatedDetails = '';
  }

  onCheckboxChange(e){
    if (e.target.checked) {
      //alert("target value:"+e.target.value);
      this.selectedProducts.push(e.target.value);
    } else {
      //alert("unchecked");
     //remove the selected product from the list
     const selectedProductId = e.target.value;
     const index = this.selectedProducts.findIndex(productId => productId === selectedProductId);
     //alert(index);
     this.selectedProducts.splice(index,1);
    }
    //alert("list: "+JSON.stringify(this.selectedProducts));
    this.selectedProductDetails = [];
    this.selectedProducts.forEach((productId) => {
      let correspondingProduct = this.rowData.find(product => product.id === productId);
      //alert("correspondingProduct: "+JSON.stringify(correspondingProduct));
      this.selectedProductDetails.push(correspondingProduct);
    })
    //alert("selectedProductDetails: "+this.selectedProductDetails);
  }

}
