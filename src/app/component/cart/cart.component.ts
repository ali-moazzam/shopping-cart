import { Component, OnInit } from '@angular/core';

import { DataService } from './../../services/data.service';
import { Product } from './../../models/product.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productDetails: Product;
  cartValue = {};
  totalQty = 0;
  totalCost = 0;
  showModal = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getProductDetails();

  }

  getProductDetails() {
    this.dataService.getData().subscribe((data: Product) => {
      console.log(data);
      this.productDetails = data;

    },
    (err) => {
      console.log(err);
    });
  }

  onClickAddCart(data, index) {
    if (!this.cartValue[index]) {
      this.cartValue[index] = 1;

    } else {
      this.cartValue[index] += 1;
    }
    this.setTotalCostAndQty(data)
    // console.log(data, index);
  }

  onClickPlusBtn(data, index) {
    if(!this.cartValue[index] || this.cartValue[index] === 0) {
      this.cartValue[index] = 1;
    } else {
      this.cartValue[index] += 1;
    }
    this.setTotalCostAndQty(data)
    // console.log(data, index);
  }

  onClickMinusButton(data, index) {
    if(!this.cartValue[index] || this.cartValue[index] <= 0) {
      return;
    } else {
      this.cartValue[index] -= 1;
      this.setTotalCostAndQty(data, 'minus')
    }
  }

  setTotalCostAndQty(data, type?) {
    this.totalQty = 0;
    Object.keys(this.cartValue).forEach(ele => {
      this.totalQty += this.cartValue[ele];
    });
    if (type === 'minus') {
      this.totalCost -= data.price;
    } else {
      this.totalCost += data.price;
    }
  }

  onClickCheckout() {
    this.showModal = true;
  }

  closeModal(event) {
    this.showModal = !event;
  }

}
