import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClunoCarsService } from "../../cluno-cars.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  cars: any = {};
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

  orderBy(str: string) {}
}
