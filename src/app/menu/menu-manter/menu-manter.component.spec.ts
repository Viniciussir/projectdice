import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManterComponent } from './menu-manter.component';

describe('MenuManterComponent', () => {
  let component: MenuManterComponent;
  let fixture: ComponentFixture<MenuManterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuManterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuManterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
