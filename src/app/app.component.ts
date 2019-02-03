import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort,MatFormFieldControl,MatFormField, MatTableDataSource} from '@angular/material'


import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms'
import {HttpClient} from '@angular/common/http';
import {product} from './product.model';
import { productservice } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

 storeproduct: product[] = []; 
 private productsubs: Subscription;
  found:boolean; 
  // aproductid = [];
  // apartname = [];
  // apartdesc = [];
  // apartvendor = [];
  // apartcost = [];
  // apartquant = [];
  
  constructor(public productservice:productservice) {
    
  
  }
  //mine
  // i:number;
  // age:number;
  // onnamekey(event:any){
  //    event.target.value;
  //   this.found = false;
  // }

  ngOnInit() {
    //productservice
    this.productservice.getallproduct().subscribe((data) =>{
       console.log(data);
       this.storeproduct = data; 
       console.log(this.storeproduct);
    });
    // this.productsubs = this.productservice.getProductUpdateListener().subscribe((prod:product[])=>{
    //   this.storeproduct = prod;
    // });
  
    // this.httpclient.get('http://localhost:3000/api/data').subscribe(
    //   (data:any[])=>{
    //     console.log(data); 
    //     console.log("----------------")
    //     console.log(data[1].part_description);
    //     if(data.length){
    //       for( this.i=0;this.i<data.length;this.i++){
    //       this.storeproduct.push(data[this.i].ProductID);  
    //       this.storeproduct.push(data[this.i].part_name);
    //       this.storeproduct.push(data[this.i].part_description);
    //       this.storeproduct.push(data[this.i].part_vendor);
    //       this.storeproduct.push(data[this.i].part_cost);
    //       this.storeproduct.push(data[this.i].part_quant);
    //       this.found = true;
    //       //return{productid:this.productid,partcost:this.partcost,partname:this.partname};
    //       }//for loop
    //       console.log("-------------asdfsdf----------------");
    //       console.log(this.storeproduct);
    //     }
    //     // if(data.length){
    //     //   this.name = data[0].part_name;
    //     //   console.log(this.age);
    //     // }
    //   }
    // );

    // this.productservice.getallproduct().subscribe((products: product[])=>{
    //   this.products = products;
    // });
    // console.log("hello ---------------------");
    // console.log(this.productmessage);
    
  }
      
  

}