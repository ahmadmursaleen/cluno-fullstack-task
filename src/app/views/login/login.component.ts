import { Component, OnInit } from "@angular/core";
import { FirebaseAuthenticationService } from "../../firebase-authentication.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  constructor(public authService: FirebaseAuthenticationService) {}
  ngOnInit() {}
}
