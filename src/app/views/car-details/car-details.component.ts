import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ClunoCarsService } from "../../cluno-cars.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-car-details",
  templateUrl: "./car-details.component.html",
  styleUrls: ["./car-details.component.scss"]
})
export class CarDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private clunocars: ClunoCarsService,
    private router: Router
  ) {}

  _subscription: Subscription;
  id: number;
  car: any = [];

  ngOnInit() {
    // subscribing to send the id and recieve the id specific car details
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this._subscription = this.clunocars
      .carDetailsSearch(this.id)
      .subscribe(response => {
        this.car = response;
      });
  }

  ngOnDestroy() {
    // unsubscribing from an observable
    this._subscription.unsubscribe();
  }
}
