import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ScrollStateService {

    trendingScrollState = signal(0);


    private pagesScrollState: Record<string, number> = {
        "page1": 1000,
        "page2": 0,
        "page3": 50,
        "page4": 0,
    }




}