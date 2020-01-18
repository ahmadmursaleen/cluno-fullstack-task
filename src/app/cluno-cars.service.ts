import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class ClunoCarsService {
  // The follwing observables from the rxjs library are used to subscribe to the data on the backend server that is hosted on a linux machine on Google Cloud platform
  carList: Observable<any>;
  carDetails: Observable<any>;

  // Htpp client is to access the Rest api. In this constructor, it is injected as a dependancy
  constructor(private http: HttpClient) {}

  // Accessing all the class details from the server with an already generated JWT
  carListSearch: Function = (): Observable<any> => {
    this.carList = this.http.post(
      "https://cluno.productionperfect.com/accounts/",
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWhtYWQiLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTU3OTE2NTU1OX0.Nfd0i4KcJAeADNGRZfalEU8jSuyh46NUGybiZd7Ngcs"
      },
      httpOptions
    );
    return this.carList;
  };

  // Accessing all the details of a car with the passed id, from the backend server with an already generated JWT
  carDetailsSearch: Function = (id): Observable<any> => {
    this.carDetails = this.http.post(
      `https://cluno.productionperfect.com/accounts/${id}`,
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWhtYWQiLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTU3OTE2NTU1OX0.Nfd0i4KcJAeADNGRZfalEU8jSuyh46NUGybiZd7Ngcs"
      },
      httpOptions
    );

    return this.carDetails;
  };
}
