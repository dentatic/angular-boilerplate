import { inject } from '@angular/core';
import { CanActivateFn,  Router } from '@angular/router';
import { AuthService } from '@core/service';

export const authGuard: CanActivateFn = (route, state) => {
  const router:Router=inject(Router)
  const authService:AuthService=inject(AuthService);

    if (!authService.isLoggedIn) {
      return router.navigate(['./login']);
    }
    if (state.url.match('login')) {
      return router.navigate(['./home']);
    }
    return true;
};
