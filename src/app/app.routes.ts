import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        title: 'Home Page',
        component: HomeComponent
    },
    {
        path: 'register-User',
        title: 'Register User',
        loadComponent: () =>
            import('./registration/registration.component').then(m => m.RegistrationComponent)
    },
    {
        path: 'detail/:id',
        title: 'detail',
        loadComponent: () =>
            import('./user-detail/user-detail.component').then(m => m.UserDetailComponent)
    },
    {
        path: 'loggedInHmPg',
        title: 'logged In Home Page',
        loadComponent: () =>
            import('./logged-in-home-page/logged-in-home-page.component').then(m => m.LoggedInHomePageComponent),
        canActivate:[AuthGuard],
        canLoad:[AuthGuard]
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
