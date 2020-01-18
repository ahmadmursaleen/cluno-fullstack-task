import { Component, OnDestroy, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { navItems } from "../../_nav";
import { FirebaseAuthenticationService } from "../../firebase-authentication.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html"
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  user: any;

  constructor(
    private authService: FirebaseAuthenticationService,
    @Inject(DOCUMENT) _document?: any
  ) {
    this.changes = new MutationObserver(mutations => {
      this.sidebarMinimized = _document.body.classList.contains(
        "sidebar-minimized"
      );
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ["class"]
    });
    // Getting the user from the local storage for logout functionality
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
