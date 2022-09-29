import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.css']
})
export class OrderCheckoutComponent implements OnInit {

  constructor(private route: ActivatedRoute,) { }
  fullName: string | null = '';
  totalPrice: number | null = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.fullName = String(this.route.snapshot.paramMap.get('fullName'));
      this.totalPrice = Number(this.route.snapshot.paramMap.get('totalPrice'));
    })
  }

}
