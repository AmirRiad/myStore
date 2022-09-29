import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  @Output() checkoutSuccess: EventEmitter<string> = new EventEmitter();


  constructor() { }
  fullName: string='';
  address: string='';
  creditCard: string='' ;
  ngOnInit(): void {

  }
  
  isInValidCreditCard(): boolean {
    var invalid= isNaN(Number(this.creditCard))
    return invalid ;
  }
  onSubmit():void{
    this.checkoutSuccess.emit(this.fullName);
  }



}
