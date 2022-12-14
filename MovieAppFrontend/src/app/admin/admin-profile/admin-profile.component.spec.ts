// import { Overlay } from '@angular/cdk/overlay';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatBottomSheetModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
// import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { of } from 'rxjs';
// import { AdminService } from 'src/app/service/admin.service';
// import { MovieService } from 'src/app/service/movie.service';
// import { UserService } from 'src/app/service/user.service';

// import { AdminProfileComponent } from './admin-profile.component';

// describe('AdminProfileComponent', () => {
//   let component: AdminProfileComponent;
//   let fixture: ComponentFixture<AdminProfileComponent>;
//   let mockUserService: jasmine.SpyObj<UserService>;
//   let mockMovieService: jasmine.SpyObj<MovieService>;
//   let mockAdminService: jasmine.SpyObj<AdminService>;
//   let mockDialog:jasmine.SpyObj<MatDialogRef<AdminProfileComponent>>;



//   beforeEach(async () => {
//     mockUserService=jasmine.createSpyObj('user service',['getUserDetails','user', 'deleteAccount']);
//     mockMovieService=jasmine.createSpyObj('movie service',['verifyPassword','changePassword']);
//     mockAdminService=jasmine.createSpyObj('admin service',['getAllUsers','changePassword']);
//     mockDialog=jasmine.createSpyObj('mat-dialog',['close']);
 

//     await TestBed.configureTestingModule({
//       imports: [MatBottomSheetModule, MatDialogModule],
//       declarations: [AdminProfileComponent],
//       providers: [Overlay, MatSnackBar,
//       { provide: UserService, useValue: mockUserService },
//       { provide: MovieService, useValue: mockMovieService },
//       { provide: AdminService, useValue: mockAdminService },
//       { provide: MatBottomSheetRef, useValue: {} },
//       { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
//       { provide: MatDialogRef, useValue: {} },
//       {provide:MatDialogRef,useValue:mockDialog}
//       ]
//     })
//       .compileComponents();

//     fixture = TestBed.createComponent(AdminProfileComponent);
//     component = fixture.componentInstance;
//     spyOn(component, 'getUserDetails').and.returnValue();
//     spyOn(component, 'getAllUsers').and.returnValue();
//     // mockAdminService.getAllUsers.and.returnValue(of(true));
//     // mockAdminService.getAllUsers.and.returnValue(of(true));
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//     // component.getUserDetails();
//     // component.getAllUsers();
//     // expect(mockUserService.getUserDetails).toHaveBeenCalledTimes(1);
//     // expect(mockAdminService.getAllUsers).toHaveBeenCalledTimes(1);
//   });


// });
