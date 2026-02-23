import {  Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
    selector: 'app-dashboard-page',
    imports: [RouterOutlet, SideMenuComponent],
    templateUrl: './dashboard-page.component.html'
})
/* Se deja 'default' para no esperar una promesa en */
export default class DashboardPageComponent { }
