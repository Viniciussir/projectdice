import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginManterComponent } from './login-manter.component';

describe('LoginManterComponent', () => {
  let component: LoginManterComponent;
  let fixture: ComponentFixture<LoginManterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginManterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginManterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
