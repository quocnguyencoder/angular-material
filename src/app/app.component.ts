import { Component, OnInit, inject } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
// import { ApplicationService } from './core/services/application.service';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
    standalone: false
})
export class AppComponent {
  title = 'frontend';
  // private colorSchemeService = inject(ColorSchemeService);
  // private appService = inject(ApplicationService);

  // ngOnInit(): void {
  //   if (this.appService.isBrowser) {
  //     this.colorSchemeService.load();
  //   }
  // }
}
