// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatMenuModule } from '@angular/material/menu';

// import { GiftSubscriptionComponent } from './gift-subscription.component';

// describe('GiftSubscriptionComponent', () => {
//   let component: GiftSubscriptionComponent;
//   let fixture: ComponentFixture<GiftSubscriptionComponent>;
//   let mockMatBottomSheetRef: jasmine.SpyObj<GiftSubscriptionComponent>;

//   beforeEach(async () => {
//     mockMatBottomSheetRef = jasmine.createSpyObj('MatBottomSheetRef', ['dismiss'])
//     await TestBed.configureTestingModule({
//       imports: [MatMenuModule, MatBottomSheetModule],
//       declarations: [ GiftSubscriptionComponent ],
//       providers: [
//         { provide: MAT_DIALOG_DATA, useValue: {} },
//         { provide: MatDialogRef, useValue: {} },
//         {provide: MatBottomSheetRef, useValue: mockMatBottomSheetRef}
//     ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(GiftSubscriptionComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
