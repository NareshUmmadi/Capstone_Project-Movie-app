// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// import { PlayComponent } from './play.component';

// describe('PlayComponent', () => {
//   let component: PlayComponent;
//   let fixture: ComponentFixture<PlayComponent>;
//   let mockDialogRef: jasmine.SpyObj<MatDialogRef<PlayComponent>>;
//   let mockDom: jasmine.SpyObj<DomSanitizer>
//   let youtube_key: SafeResourceUrl;
  

//   beforeEach(async () => {
//     mockDialogRef = jasmine.createSpyObj('mat-dialog', ['close']);
//     mockDom = jasmine.createSpyObj('_sanitizer', ['bypassSecurityTrustResourceUrl']);
//     await TestBed.configureTestingModule({
//       imports: [MatDialogModule],
//       declarations: [ PlayComponent ],
//       providers: [{provide:MatDialogRef,useValue:mockDialogRef},
//         { provide: MAT_DIALOG_DATA, useValue: {} },
//         { provide: DomSanitizer, useValue: {
//           sanitize: () => 'safeString',
//           bypassSecurityTrustHtml: () => 'safeString'
//         }}
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(PlayComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
