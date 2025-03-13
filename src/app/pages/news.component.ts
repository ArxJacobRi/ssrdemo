import { AsyncPipe, isPlatformBrowser, isPlatformServer, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Component, inject, makeStateKey, OnInit, PLATFORM_ID, TransferState} from '@angular/core';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DATA_KEY} from '../app.component';

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
  private readonly transferState = inject(TransferState);
  private readonly platformId = inject(PLATFORM_ID);
  public data: any = null;

  constructor() {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.data = of(this.transferState.get(DATA_KEY, {})['/news']);
    }

    if (isPlatformServer(this.platformId)) {
      console.log(this.transferState.toJson());
    }
  }
}
