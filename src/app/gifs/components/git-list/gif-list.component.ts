import { Component, input } from '@angular/core';
import { GifListItemComponent } from "./gif-list-item/gif-list-item.component";
import { Gif } from '../../interfaces/gif.interface';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'gif-list',
    standalone: true,  
    imports: [GifListItemComponent, CommonModule],
    templateUrl: './gif-list.component.html'
})
export class GifListComponent { 

  gifs = input.required<Gif[]>();
}
