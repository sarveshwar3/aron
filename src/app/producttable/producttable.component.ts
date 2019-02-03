import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatSort,MatFormFieldControl,MatFormField, MatTableDataSource} from '@angular/material'
import 'rxjs/add/operator/toPromise';

import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms'
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import {product} from '../product.model';
import { productservice } from '../product.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-producttable',
  templateUrl: './producttable.component.html',
  styleUrls: ['./producttable.component.css']
})
export class ProducttableComponent implements OnInit {
  length:number;
  timestamp:number;
  storeproduct: product[] = []; 
  private productsubs: Subscription;
  private header = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(public http:HttpClient,public productservice:productservice) { }

  productobject:object = [];
  id:number;

  onClickSubmit(form: NgForm) {
    this.length = 8;
    this.timestamp = +new Date;
    
    var _getRandomInt = function( min, max ) {
     return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
    
  
      var ts = this.timestamp.toString();
      var parts = ts.split( "" ).reverse();
      var id = "";
      
      for( var i = 0; i < this.length; ++i ) {
       var index = _getRandomInt( 0, parts.length - 1 );
       id += parts[index];	 
      }
      console.log(id);
    alert("Entered Email id : " + form.value.quantity);
    this.productobject = {
      "ProductID":Math.random(),
      "part_name": form.value.name,
      "part_description": form.value.description,
      "part_vendor":form.value.vendor,
      "part_cost":form.value.cost,
      "part_quant":form.value.quantity,
      "Price":form.value.cost
    }

    //[{"ProductID":101,"part_name":"lights","part_description":"lighting the world",
    //"part_vendor":"aron","part_cost":"100","part_quant":50,"Price":10}]
    this.http.post('http://localhost:3000/api/data',this.productobject).subscribe(
      (res:HttpResponse<any>)=> {console.log(res);
      
      });
   //this.productservice.addproduct(form.value.title, form.value.content);
 }

  deleteproduct(id){
    if(confirm("are you sure?")){
      // const url = `${"http://localhost:3000/api/data"}/${id}`;
      // return this.http.delete<void>(url).toPromise().then(()=>{
      //      this.productservice.getallproduct().subscribe((data)=>{
      //        console.log(data);
      //        this.storeproduct = data;
      //        console.log(this.storeproduct);
      //      });
      // });
      this.productservice.deleteproduct(id); 
    } 
    console.log(id);
  }

   
 
  ngOnInit() {
    this.productservice.getallproduct().subscribe((data) =>{
      console.log(data);
      this.storeproduct = data; 
      console.log(this.storeproduct);
   });
  }

}
