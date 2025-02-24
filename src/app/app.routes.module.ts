import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { provideAnimations } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
    data: {
      show: false,
      showChildren: false,
      navLabel: 'Home',
      title: 'Home',
      description:
        'Adaptive smart learning: cloud engineering based on human behavior',
      icon: 'house',
    },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
    data: {
      show: true,
      showChildren: false,
      navLabel: 'Home',
      title: 'Home',
      description:
        'Adaptive smart learning: cloud engineering based on human behavior',
      icon: 'house',
    },
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./features/customers/customers.module').then(
        (m) => m.CustomersModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./features/account/account.module').then((m) => m.AccountModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'icons',
    loadChildren: () =>
      import('./features/icons/icons.module').then((m) => m.IconsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'typography',
    loadChildren: () =>
      import('./features/typography/typography.module').then(
        (m) => m.TypographyModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.module').then((m) => m.AboutModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [provideAnimations()],
})
export class AppRoutingModule {}
