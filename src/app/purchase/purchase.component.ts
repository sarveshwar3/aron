import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { productservice } from '../product.service';
import { product } from '../product.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  storeproducts:product[] = [];
  length:number;
  timestamp:number;


  productobject:object = [];
  constructor(public http:HttpClient,public productservice:productservice) { }
  onClickSubmit(form: NgForm) {
   // var x = form.value.fixavail;
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
			
   
  // var y = +x;
    var b = +z;
    var q = +w;
    this.productobject = {
      "id":id,
      "part_id": b,
      "quant": q
    }
    this.http.post('http://localhost:3000/api/purchase/part',this.productobject).subscribe(
      (res:HttpResponse<any>)=> {console.log(res);
      
      });
 }
  ngOnInit() {
    this.productservice.getallproduct().subscribe((data) =>{
      console.log(data);
      this.storeproducts = data; 
      console.log(this.storeproducts);
   });
  }

}
