// import { ComponentPortal } from '@angular/cdk/portal';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ActivatedRoute, convertToParamMap } from '@angular/router';
// import { of } from 'rxjs';
// import { MovieService } from 'src/app/service/movie.service';
// import { UserService } from 'src/app/service/user.service';
// import { MovieDetailComponent } from './movie-detail.component';

// describe('MovieDetailComponent', () => {
//   let component: MovieDetailComponent;
//   let fixture: ComponentFixture<MovieDetailComponent>;
//   let mockUserService: jasmine.SpyObj<UserService>
//   let mockMovieService: jasmine.SpyObj<MovieService>
//   let mockDialogRef: jasmine.SpyObj<MatDialogRef<MovieDetailComponent>>;



//   beforeEach(async () => {
//     let activatedRouteSpy = {
//       snapshot: {
//         paramMap: convertToParamMap({
//           id: 'dads123',
//           code: 'IBM',
//         })
//       }
//     };

//     mockUserService = jasmine.createSpyObj('user service', ['getUserDetails', 'user'])
//     mockMovieService = jasmine.createSpyObj('movie service', ['getMovieById', 'getMovieCast', 'getMovieVideos',
//     'getSimilarMovies', 'addMovieToFavourite', 'addMovieToWatchlist',
//     'removeMovieFromWatchlist', 'removeMovieFromFavourite', 'poster_path'])
//     await TestBed.configureTestingModule({
//       imports: [BrowserAnimationsModule,MatDialogModule],
//       declarations: [ MovieDetailComponent ],
//       providers: [{provide: ActivatedRoute, useValue: activatedRouteSpy},
//         {provide: UserService, useValue: mockUserService},
//         {provide: MovieService, useValue: mockMovieService},
//         { provide: MatDialogRef, useValue: mockDialogRef }
//       ]
//     })
//     .compileComponents();
    
//     mockMovieService.getMovieById.and.returnValue(of(true));
//     mockMovieService.getMovieCast.and.returnValue(of(true));
//     mockMovieService.getSimilarMovies.and.callFake(():any=>{});
//     mockMovieService.getSimilarMovies.and.returnValue(of(true));

//     fixture = TestBed.createComponent(MovieDetailComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     mockMovieService.getSimilarMovies.and.returnValue(of(true))
//     expect(component).toBeTruthy();
//   });

// });
