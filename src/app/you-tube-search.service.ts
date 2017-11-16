import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { SearchResult } from './models/search-result';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class YouTubeSearchService {

  constructor(private http: HttpClient,
              @Inject(environment.YOU_TUBE_API_KEY) private apiKey: string,
              @Inject(environment.YOU_TUBE_API_URL) private apiUrl: string) { }

  search(query: string): Observable<SearchResult[]> {
        const params = [
          `q=${query}`,
          `key=${this.apiKey}`,
          `part=snippet`,
          `type=video`,
          `maxResults=10`
          ].join('&');
        const queryUrl = `${this.apiUrl}?${params}`;
        return this.http.get(queryUrl).map(response => {
            return <any>response['items'].map(item => {
              // console.log('raw results', response);
              return new SearchResult({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnailUrl: item.snippet.thumbnails.high.url
              });
            });
        });
  }

}
