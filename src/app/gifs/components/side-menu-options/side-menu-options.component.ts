import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifsService } from '../../services/gifs.service';

interface MenuOption {
  label: string;
  router: string;
  icon: string;
  subLabel: string;
}

@Component({
    selector: 'gifs-side-menu-options',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './side-menu-options.component.html'
})
export class SideMenuOptionsComponent {

  gifService =inject(GifsService)

  menuOptions: MenuOption[] = [
    { icon: 'fa-solid fa-chart-line', label: 'Trending', subLabel: 'Gifs Populares', router: '/dashboard/trending' },
    { icon: 'fa-solid fa-magnifying-glass', label: 'Buscador', subLabel: 'Buscar gifs', router: '/dashboard/search' }
  ]

}
