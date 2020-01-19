import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClunoCarsService } from "../../cluno-cars.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  cars: any = {};
  tempCars: any = []; // This is a variable used for dom manipulation for filtering

  // subscription is used to subscribe to an obervable to access async data
  _subscription: Subscription;
  constructor(private router: Router, private clunocars: ClunoCarsService) {}
  ngOnInit(): void {
    // Subscribing to the observable
    this._subscription = this.clunocars.carListSearch().subscribe(response => {
      this.cars = response;
    });
  }
  carDetails(id: any) {
    // Sending the id to the car details component
    this.router.navigate(["cardetails", id]);
  }

  ngOnDestroy() {
    // unsubscribing from an observable
    this._subscription.unsubscribe();
  }

  // Functionalities to sort the car list in ascending and descending order
  orderBy(str: string) {
    if (str === "asc") {
      this.tempCars = Array.of(this.cars);
      this.cars.Items = this.tempCars[0].Items.sort((obj1, obj2) => {
        if (
          parseInt(obj1.pricing.M.price.N) > parseInt(obj2.pricing.M.price.N)
        ) {
          return 1;
        }
        if (
          parseInt(obj1.pricing.M.price.N) < parseInt(obj2.pricing.M.price.N)
        ) {
          return -1;
        }
        return 0;
      });
    } else if (str === "dsc") {
      this.tempCars = Array.of(this.cars);
      this.cars.Items = this.tempCars[0].Items.sort((obj1, obj2) => {
        if (
          parseInt(obj1.pricing.M.price.N) > parseInt(obj2.pricing.M.price.N)
        ) {
          return -1;
        }
        if (
          parseInt(obj1.pricing.M.price.N) < parseInt(obj2.pricing.M.price.N)
        ) {
          return 1;
        }
        return 0;
      });
    }
  }
}
