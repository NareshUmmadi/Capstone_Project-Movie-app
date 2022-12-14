// import { NgModule } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NgModel } from '@angular/forms';
// import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { UserService } from 'src/app/service/user.service';

// import { UpdateAvatarComponent } from './update-avatar.component';

// describe('UpdateAvatarComponent', () => {
//   let component: UpdateAvatarComponent;
//   let fixture: ComponentFixture<UpdateAvatarComponent>;
//   let mockUserService:jasmine.SpyObj<UserService>;
//   let mockDialogRef: jasmine.SpyObj<MatDialogRef<UpdateAvatarComponent>>;


//   beforeEach(async () => {
//     mockUserService=jasmine.createSpyObj('user service',['updateAvatar']);
//     mockDialogRef = jasmine.createSpyObj('mat-dialog',['close']);
//     await TestBed.configureTestingModule({
//       imports: [MatDialogModule,MAT_DIALOG_DATA,MatDialogRef],
//       declarations: [ UpdateAvatarComponent ],
//       providers: [NgModule,
//         {provide:UserService,useValue:mockUserService},
//         {provide:MatDialogRef,useValue:mockDialogRef},
//         { provide: MAT_DIALOG_DATA, useValue: {}  }
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(UpdateAvatarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
