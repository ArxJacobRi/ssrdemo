import { AsyncPipe, isPlatformBrowser, isPlatformServer, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  selector: 'news-page',
  template: `
    <div>This is the News page.</div>
    <pre>{{ data | async | json }}</pre>
  `
})

export class NewsPageComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly httpClient = inject(HttpClient);
  public data = this.httpClient.get(
    'https://api.open-meteo.com/v1/forecast?latitude=52.462&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m',
  );

  constructor() { }

  ngOnInit() {
    console.log('Browser:', isPlatformBrowser(this.platformId));
    console.log('Server:', isPlatformServer(this.platformId));
  }
}
