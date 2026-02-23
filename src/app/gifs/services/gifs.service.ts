import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';
import { group } from '@angular/animations';

const GIF_KEY = 'gifs'

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; // Record<stirng,gifs[]>
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs
}

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);


  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(false)

  private trendingPage = signal(0);

  // [[gif,gif,gif],[gif,gif,gif],[gif,gif,gif],[gif,gif,gif]]
  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    //console.log(groups);
    return groups; // [ [g1, g2, g3], [g4,g5] ]
  });


  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  constructor() {
    this.loadTrendingGifs()
    //console.log('Servicio creado')
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  loadTrendingGifs() {

    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20,
        rating: 'g'
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
      this.trendingGifs.update(currentGif => [...currentGif, ...gifs]);
      this.trendingPage.update(page => page + 1);

      this.trendingGifsLoading.set(false);
    });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 20,
        offset: 0,
        rating: 'g',
        lang: 'en',
        bundle: 'messaging_non_clips'
      }
    }).pipe(
      //tap(resp=> console.log({tap:resp}))
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemToGifArray(items)),


      // TODO: Historial
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLowerCase()]: items,
        }))
      })

    );
  }

  getHistoryGifs(query: string) {
    return this.searchHistory()[query] ?? [];
  }

  

}
