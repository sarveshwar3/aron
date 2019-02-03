import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';

import {product} from './product.model';
import {fixture} from './fixture.model'; 

@Injectable() 
export class productservice{ 
   posts:fixture[] = [];
   productlocal:product[] = [];
   private productUpdated = new Subject<product[]>();
  constructor(private http: HttpClient){}
 
  getallproduct(): Observable<product[]> {
    return this.http.get<product[]>('http://localhost:3000/api/data');
  }

  addproduct(name: string, cost: string) {
    const post:fixture  = { id: 11, name: name, cost: cost };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/fix", post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
       // this.postsUpdated.next([...this.posts]);
      });
  }

//   getallproduct(): Observable<product[]>{
//       return this.http.get<product[]>('http://localhost:3000/api/data');
//   }
// getallproduct(){
//   this.http.get<{message:string,productlocal:product[]}>('http://localhost:3000/api/data')
//   .subscribe(productdata=>{
//       this.productlocal = productdata.productlocal;
//       this.productUpdated.next(this.productlocal);
//   });
// }

//product update listner
getProductUpdateListener() {
    return this.productUpdated.asObservable();
  }

}//productservice end




