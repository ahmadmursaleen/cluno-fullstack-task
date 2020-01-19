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

  // togglers to manipulate DOM to toogle between min and max values
  minToggler: boolean = false;
  maxToggler: boolean = false;

  // Objects storing details of minimum and maximum priced car
  maxCar: any = {};
  minCar: any = {};

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
    // setting the min and max togglers to false to display the full list of visible cars
    this.minToggler = false;
    this.maxToggler = false;

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

  // Fucntionlaity to extract the min value and then úsing that to extact the minimum priced car details
  getMin() {
    let min: any;
    this.maxToggler = false;
    this.minToggler = true;
    this.tempCars = Array.of(this.cars);
    min = Math.min.apply(
      Math,
      this.tempCars[0].Items.map(function(o) {
        return o.pricing.M.price.N;
      })
    );
    this.minCar = this.tempCars[0].Items.find(
      x => parseInt(x.pricing.M.price.N) == min
    );
  }

  // Fucntionlaity to extract the maximum value and then úsing that to extact the maximum priced car details
  getMax() {
    let max: any;
    this.minToggler = false;
    this.maxToggler = true;
    this.tempCars = Array.of(this.cars);
    max = Math.max.apply(
      Math,
      this.tempCars[0].Items.map(function(o) {
        return o.pricing.M.price.N;
      })
    );
    this.maxCar = this.tempCars[0].Items.find(
      x => parseInt(x.pricing.M.price.N) == max
    );
  }
}
