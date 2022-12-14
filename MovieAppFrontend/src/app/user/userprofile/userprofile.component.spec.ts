// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Observable, observable } from 'rxjs';
// import { MovieDetailComponent } from 'src/app/movie/movie-detail/movie-detail.component';
// import { MovieService } from 'src/app/service/movie.service';
// import { UserService } from 'src/app/service/user.service';

// import { UserprofileComponent } from './userprofile.component';

// describe('UserprofileComponent', () => {
//   let component: UserprofileComponent;
//   let fixture: ComponentFixture<UserprofileComponent>;
//   let mockUserService: jasmine.SpyObj<UserService>;
//   let mockMovieService: jasmine.SpyObj<MovieService>;
//   let mockMatDialog: jasmine.SpyObj<MatDialogRef<UserprofileComponent>>;

//   beforeEach(async () => {
//     mockUserService=jasmine.createSpyObj('user service',['getUserDetails', 'user']);
//     mockMovieService=jasmine.createSpyObj('movie service',['addMovieToWatchlist', 'removeMovieToWatchlist', 'addMovieToFavourites', 'removeMovieToFavourites']);
//     mockMatDialog=jasmine.createSpyObj('mat-dialog',['open']);
//     await TestBed.configureTestingModule({
//       imports:[MatDialogModule,RouterTestingModule.withRoutes([{path: 'movie', component:MovieDetailComponent}])],
//       declarations: [ UserprofileComponent ],
//       providers: [MatSnackBar,
//         {provide: UserService, useValue: mockUserService},
//         {provide: MatDialogRef, useValue: mockMatDialog },
//         {provide: MovieService, useValue: mockMovieService}
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(UserprofileComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
