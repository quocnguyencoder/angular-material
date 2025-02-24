// import { AuthGuard } from './auth.guard';
// import moment from 'moment';

// describe('AuthGuard', () => {


//   it('create an instance', () => {
//     const guard = new AuthGuard();
//     expect(guard).toBeTruthy();
//   });

//   it('returns false if user is null', () => {
//     const guard = new AuthGuard();

//     const result = guard.canActivate();

//     expect(result).toBe(false);
//   });

//   it('redirects to login if user is null', () => {    
//     const guard = new AuthGuard();

//     guard.canActivate();

//     // expect().toHaveBeenCalledWith(['auth/login']);
//   });

//   it('does not display expired notification if user is null', () => {
//     authService.getCurrentUser.and.returnValue(null);
//     const guard = new AuthGuard(router, notificationService, authService);

//     guard.canActivate();

//     expect(notificationService.openSnackBar).toHaveBeenCalledTimes(0);
//   });

//   it('redirects to login if user session has expired', () => {
//     const user = { expiration: moment().add(-1, 'minutes') };
//     authService.getCurrentUser.and.returnValue(user);
//     const guard = new AuthGuard(router, notificationService, authService);

//     guard.canActivate();

//     expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
//   });

//   it('displays notification if user session has expired', () => {
//     const user = { expiration: moment().add(-1, 'seconds') };
//     authService.getCurrentUser.and.returnValue(user);
//     const guard = new AuthGuard(router, notificationService, authService);

//     guard.canActivate();

//     expect(notificationService.openSnackBar).toHaveBeenCalledWith(
//       'Your session has expired'
//     );
//   });

//   it('returns true if user session is valid', () => {
//     const user = { expiration: moment().add(1, 'minutes') };
//     authService.getCurrentUser.and.returnValue(user);
//     const guard = new AuthGuard(router, notificationService, authService);

//     const result = guard.canActivate();

//     expect(result).toBe(true);
//   });
// });
