// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Observable, of } from 'rxjs';
// import { MovieDetailComponent } from 'src/app/movie/movie-detail/movie-detail.component';
// import { SearchComponent } from 'src/app/movie/search/search.component';
// import { MovieService } from 'src/app/service/movie.service';
// import { UserService } from 'src/app/service/user.service';
// import { ChangePasswordComponent } from 'src/app/user/change-password/change-password.component';

// import { HomepageComponent } from './homepage.component';

// describe('HomepageComponent', () => {
//   let component: HomepageComponent;
//   let fixture: ComponentFixture<HomepageComponent>;
//   let mockUserService: jasmine.SpyObj<UserService>;
//   let mockMovieService: jasmine.SpyObj<MovieService>;
//   let mockDialogRef: jasmine.SpyObj<MatDialogRef<HomepageComponent>>;


//   let matDialogMock ={
//     open() {
//       return {
//         afterClosed: () => of({action: true})
//       };
//     }
//   }

  
//   beforeEach(async () => {
//     mockUserService = jasmine.createSpyObj('userService', ['getUserDetails', 'user', 'userDetails'])
//     mockMovieService = jasmine.createSpyObj('movieService', ['getNowPlayingMovies', 'getPopularMovies', 'getTopRatedMovies', 'getAllTrailers', 'addMovieToFavourites', 'addMovieToWatchlist', 'removeMovieFromWatchlist', 'removeMovieFromFavourite',])
//     mockDialogRef = jasmine.createSpyObj('mat-dialog', ['open']);

//     await TestBed.configureTestingModule({
//       imports: [BrowserAnimationsModule,MatDialogModule ,RouterTestingModule.withRoutes([{ path: 'movie', component: MovieDetailComponent }, { path: 'search', component: SearchComponent }])],
//       declarations: [HomepageComponent],
//       providers: [
//         { provide: UserService, useValue: mockUserService },
//         { provide: MovieService, useValue: mockMovieService },
//         // { provide: MovieService, useValue: mockSomeService },
//         { provide: MatDialogRef, useValue: mockDialogRef },
//         { provide: MatDialog, useValue: matDialogMock }
//       ]
//     })
//       .compileComponents();

//     fixture = TestBed.createComponent(HomepageComponent);
//     component = fixture.componentInstance;
//     spyOn(component,'ngOnInit').and.callFake(()=>{});
//     mockMovieService.getNowPlayingMovies.and.returnValue(of(true));
//     mockMovieService.getPopularMovies.and.returnValue(of(true));
//     mockMovieService.getTopRatedMovies.and.returnValue(of(true));
//     mockMovieService.getAllTrailers.and.returnValue(of(true));
//     mockUserService.getUserDetails
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should add to favourite', () => {
//     let movie = '';
//     mockMovieService.addMovieToFavourites.and.returnValue(of(true));
//     component.addToFavourite(movie);
//     expect(mockMovieService.addMovieToFavourites).toHaveBeenCalledTimes(1);
//   });

//   it('should add to watchlist', () => {
//     let movie = '';
//     mockMovieService.addMovieToWatchlist.and.returnValue(of(true));
//     component.addToWatchlist(movie);
//     expect(mockMovieService.addMovieToWatchlist).toHaveBeenCalledTimes(1);
//   });

//   it('should remove to favourite', () => {
//     let movie = '';
//     mockMovieService.removeMovieFromFavourite.and.returnValue(of(true));
//     component.removeFromFavourite(movie);
//     expect(mockMovieService.removeMovieFromFavourite).toHaveBeenCalledTimes(1);
//   });
  
//   it('should removie to watchlist', () => {
//     let movie = '';
//     mockMovieService.removeMovieFromWatchlist.and.returnValue(of(true));
//     component.removeFromWatchlist(movie);
//     expect(mockMovieService.removeMovieFromWatchlist).toHaveBeenCalledTimes(1);
//   });

//   it('should refresh user details', () => {
//     let user:any;
//     mockUserService.getUserDetails.and.returnValue(of(user));
//     component.refreshUserDetail();
//     expect(mockUserService.getUserDetails).toHaveBeenCalledTimes(1);
//   });
// });
