import {Component, inject, makeStateKey, PLATFORM_ID, REQUEST, TransferState} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {isPlatformServer} from '@angular/common';
import {delay, tap} from 'rxjs/operators';
import {concat} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export const DATA_KEY = makeStateKey<any>('data');

const URLS: any = {
  '/about': 'https://api.open-meteo.com/v1/forecast?latitude=52.462&longitude=53.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m',
  '/news': 'https://api.open-meteo.com/v1/forecast?latitude=12.462&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m',
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ssrdemo';

  private readonly request = inject(REQUEST);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly transferState: any = inject(TransferState);
  private readonly httpClient = inject(HttpClient);

  constructor() {
    if(isPlatformServer(this.platformId)) {
      const requestUrl = new URL(this.request?.url ?? '').pathname;
      const url = URLS[requestUrl];

      concat(
        this.httpClient.get(url).pipe(
          delay(3000),
          tap((response) => {
            const curr = JSON.parse(this.transferState.toJson());
            this.transferState.set(DATA_KEY, { ...curr.data, [requestUrl]: response });
          })
        ),
        ...Object.keys(URLS).map((key) => {
          return  this.httpClient.get(URLS[key]).pipe(
            tap((response) => {
              const curr = JSON.parse(this.transferState.toJson());
              this.transferState.set(DATA_KEY, { ...curr.data, [key]: response });
            })
          )
        })
      ).subscribe();
    }
  }
}
