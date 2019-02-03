import { Component, OnInit } from '@angular/core';
import { fixture } from '../fixture.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { productservice } from '../product.service';
import { product } from '../product.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fixturetable',
  templateUrl: './fixturetable.component.html',
  styleUrls: ['./fixturetable.component.css']
})
export class FixturetableComponent implements OnInit {

  storeproduct: fixture[] = [];
  storeproducts:product[] = [];
  length:number;
  timestamp:number;


  productobject:object = [];
  constructor(public http:HttpClient,public productservice:productservice) { }

  deleteproduct(id){
    if(confirm("are you sure?")){
      this.productservice.deletefixture(id); 
    } 
    console.log(id);
  }
  //adds the fixture parts
  onClickSubmit(form: NgForm) {
    var x = form.value.fixavail;
    var z = form.value.partavail;
    var w = form.value.quantity; 
    alert("Entered Email id : " + form.value.fixavail);

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
			
   
    var y = +x;
    var b = +z;
    var q = +w;
    this.productobject = {
      "id":id,
      "fixture_id": y,
      "part_id": b,
      "quant": q
    }
    this.http.post('http://localhost:3000/api/fix/part',this.productobject).subscribe(
      (res:HttpResponse<any>)=> {console.log(res);
      
      });
 }

  ngOnInit() {
    this.productservice.getallfixture().subscribe((data) =>{
      console.log(data);
      this.storeproduct = data; 
      console.log(this.storeproduct);
   });
   this.productservice.getallproduct().subscribe((data) =>{
    console.log(data);
    this.storeproducts = data; 
    console.log(this.storeproduct);
 });
  }

}
