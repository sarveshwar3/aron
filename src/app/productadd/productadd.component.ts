import { timestamp } from 'rxjs-compat/operator/timestamp';
import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import { NgForm } from "@angular/forms";
import { productservice } from '../product.service';


@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {
 
length:number;
timestamp:number;
  
  constructor(private http: HttpClient,public productservice:productservice) { }
  productobject:object = [];

  onClickSubmit(form: NgForm) {
    alert("Entered Email id : " + form.value.name);
    
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
			
    this.productobject = {
      "id":id,
      "fixture_name": form.value.name,
      "fixture_cost": form.value.cost
    }
    this.http.post('http://localhost:3000/api/fix',this.productobject).subscribe(
      (res:HttpResponse<any>)=> {console.log(res);
      
      });
 }
  ngOnInit() {
  }

}
