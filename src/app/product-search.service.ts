import { Injectable, ErrorHandler} from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Product} from './models/product';
import { Observable,throwError, BehaviorSubject,of } from 'rxjs';
import {retry,catchError} from 'rxjs/operators';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  private headers = new HttpHeaders({});

  constructor( private http: HttpClient) { 
   
  }

  getProductsByName(name:string):Observable<Product[]>{
    //Commented out the actual service url to use hard coded values for demo purpose
    //let productSearchByNameUrl:string = environment.getProductsServiceUrl+"/"+name;
    //return this.http.get<Product[]>(productSearchByNameUrl,{"headers":this.headers}).pipe(retry(1),catchError(this.errorHandler));
    if(name == "iphone"){
      let result1 : Product[] = [
       {"creationDate":"1593003840336","lastUpdatedDate":"1593003840336","id":"2","name":"iphone6","seller":"apple","imagePath":"./assets/images/iphone-160307_1280.png","price":"349.99","categoryName":"mobile_phones"},
       {"creationDate":"1593003840336","lastUpdatedDate":"1593003840336","id":"4","name":"iphone11","seller":"apple","imagePath":"./assets/images/iphone-160307_1280.png","price":"699.99","categoryName":"mobile_phones"}
      ];
      return of (result1);
    }else if(name == "blackberry"){
      let result2 = [
        {"creationDate":"1593003840336","lastUpdatedDate":"1593003840336","id":"3","name":"blackberry9","seller":"blackberry","imagePath":"./assets/images/smartphone-153650_1280.png","price":"299.99","categoryName":"mobile_phones"}
      ];
      return of (result2);
    }else{
      return  of ([]);
    }
    
  }

  errorHandler(error: HttpErrorResponse){
    alert("errorHandler error: "+JSON.stringify(error));
    let errorMsg = "";
    if(error.message == ""){
      errorMsg = "Server Error";

    }else if(null != error.error.message && error.error.message != undefined){
      errorMsg = error.error.message;
    }else{
      errorMsg = error.message;
    }
    alert("errorHandler errorMsg: "+errorMsg);
    return throwError(errorMsg);
  }

}
