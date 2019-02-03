import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';

import {product} from './product.model';
import {fixture} from './fixture.model'; 

@Injectable() 
export class productservice{ 
   //reference to the fixture model
   posts:fixture[] = [];

   //reference to the product model
  

   //reference to the product model
   productlocal:product[] = [];

   private productUpdated = new Subject<product[]>();
  constructor(private http: HttpClient){}
 
  //----------------------------------------------------------------------------------
  //used to get all the product from the db producttable
  getallproduct(): Observable<product[]> {
    return this.http.get<product[]>('http://localhost:3000/api/data');
  }

   //----------------------------------------------------------------------------------
  //deletes data from the product table
  //---------------------------------------------------------------------------------
  deleteproduct(id:number){
     this.http.delete<{message: string}>("http://localhost:3000/api/data/"+id).subscribe(()=>{
       console.log("deleted the product");
     });
       
  }

   //adds data to fixture table
  //----------------------------------------------------------------------------------
  addproduct(name: string, cost: string) {
    const post:fixture  = { id: Math.random(), name: name, cost: cost };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/fix", post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
       // this.postsUpdated.next([...this.posts]);
      });
  }
//------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------
//display all the fixture from the table
getallfixture(): Observable<fixture[]> {
  return this.http.get<fixture[]>('http://localhost:3000/api/fix');
}

//----------------------------------------------------------------------------------
// delete fixture from table
deletefixture(id:number){
  this.http.delete<{message: string}>("http://localhost:3000/api/fix/"+id).subscribe(()=>{
    console.log("deleted the fixture");
  });
    
}

//-------------------------------------------------------------------------------------
//product update listner
getProductUpdateListener() {
    return this.productUpdated.asObservable();
  }

}//productservice end




