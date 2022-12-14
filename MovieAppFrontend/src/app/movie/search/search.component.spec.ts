import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
import { UserService } from 'src/app/service/user.service';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockMovieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('_user', ['getUserDetails', 'user', 'userDetail']);
    mockMovieService = jasmine.createSpyObj('_movie', ['search', 'addMovieToWatchlist', 'addMovieToFavourites', 'removeMovieFromFavourite', 'removeMovieFromWatchlist']);

    let activatedRouteSpy = {
      paramMap: {
        subscribe: () => { }
      }
    };


    await TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [SearchComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: MovieService, useValue: mockMovieService },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    spyOn(activatedRouteSpy.paramMap, 'subscribe').and.returnValue();
    mockMovieService.search.and.returnValue(of(true));
    component.get();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get searched movie', () => {
    mockMovieService.search.and.returnValue(of(true));
    component.get();
    expect(mockMovieService.search).toHaveBeenCalledTimes(0);
  });

  it('should get user details', () => {
    let user:any;
    mockUserService.getUserDetails.and.returnValue(user);
    spyOn(component, 'getUserDetails').and.returnValue();
    component.getUserDetails();
    expect(mockUserService.getUserDetails).toHaveBeenCalledTimes(0);
  });

  it('should add to watchlist', () => {
    let movie: any = '';
    mockMovieService.addMovieToWatchlist.and.returnValue(of(true));
    expect(mockMovieService.addMovieToWatchlist).toHaveBeenCalledTimes(0);
  });

  
});
