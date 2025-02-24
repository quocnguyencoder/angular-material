import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  public applicationLoaded$ = new BehaviorSubject<boolean>(undefined as any);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  set currentApplicationLoadedValue(loaded: boolean) {
    this.applicationLoaded$.next(loaded);
  }

  get currentApplicationLoadedValue(): boolean {
    return this.applicationLoaded$.value;
  }
}
