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

  
  constructor(private http: HttpClient,public productservice:productservice) { }
  productobject:object = [];

  // addnewproduct = function(product){
  //   this.productobject = {
  //     "id":1,
  //     "fixture_name": product.name,
  //     "fixture_cost": product.desc
  //   }
  //   this.http.post('http://localhost:3000/api/fix',this.productobject).subscribe(
  //     (res:HttpResponse<any>)=> {console.log(res);
      
  //     }); 
  // }
  onClickSubmit(form: NgForm) {
    alert("Entered Email id : " + form.value.name);
    this.productobject = {
      "id":1,
      "fixture_name": form.value.name,
      "fixture_cost": form.value.cost
    }
    this.http.post('http://localhost:3000/api/fix',this.productobject).subscribe(
      (res:HttpResponse<any>)=> {console.log(res);
      
      });
   //this.productservice.addproduct(form.value.title, form.value.content);
 }
  ngOnInit() {
  }

}
