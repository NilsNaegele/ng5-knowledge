import { YouTubeSearchService } from './you-tube-search.service';
import { environment } from '../environments/environment';

export const youTubeSearchInjectables = [
    { provide: YouTubeSearchService, useClass: YouTubeSearchService },
    { provide: environment.YOU_TUBE_API_KEY, useValue: environment.YOU_TUBE_API_KEY },
    { provide: environment.YOU_TUBE_API_URL, useValue: environment.YOU_TUBE_API_URL }
];
