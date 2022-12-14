import { DialogRef } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';

import { GiveCreditsComponent } from './give-credits.component';

describe('GiveCreditsComponent', () => {
  let component: GiveCreditsComponent;
  let fixture: ComponentFixture<GiveCreditsComponent>;
  let mockAdminService: jasmine.SpyObj<AdminService>;
  const dialogMock = {
    close: () => { }
    };

  beforeEach(async () => {
    mockAdminService = jasmine.createSpyObj('adminService', ['giveCredits'])
    await TestBed.configureTestingModule({
      imports:[BrowserAnimationsModule,MatDialogModule],
      declarations: [ GiveCreditsComponent ],
      providers:[FormsModule,FormControl, MatSnackBar,Overlay,{provide: AdminService, useValue: mockAdminService},{ provide: MatDialogRef, useValue: dialogMock}, { provide: MAT_DIALOG_DATA, useValue: {}}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiveCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('giftCredits should be called when giftCredits button clicked',() => {
    mockAdminService.giveCredits.and.returnValue(of(true));
    let credits = component.creditControl.setValue('100')
    let spy = spyOn(component.dialogRef, 'close')
    component.giftCredits(credits);
    expect(mockAdminService.giveCredits).toHaveBeenCalledTimes(1);
  })

  it('giftCredits service should not called when giftCredits below then 50',() => {
    mockAdminService.giveCredits.and.returnValue(of(true));
    let credits = component.creditControl.setValue('40')
    let spy = spyOn(component.dialogRef, 'close')
    component.giftCredits(credits);
    expect(mockAdminService.giveCredits).toHaveBeenCalledTimes(0);
  })
});
