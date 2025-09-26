import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantUserComponent } from './mant.user.component';

describe('MantUserComponent', () => {
  let component: MantUserComponent;
  let fixture: ComponentFixture<MantUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
