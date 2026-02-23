import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifListComponent } from "../../components/git-list/gif-list.component";

@Component({
    selector: 'page-gif-history',
    imports: [GifListComponent],
    templateUrl: './gif-history.component.html'
})
export default class GifHistoryComponent {
  //query1 = inject(ActivatedRoute).params.subscribe(params => console.log(params['query']));

  gifService = inject(GifsService)

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map(params => params['query']))
  );


  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query())
  })

}
