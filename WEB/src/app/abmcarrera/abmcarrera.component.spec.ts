import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ABMCarreraComponent } from './abmcarrera.component';

describe('ABMCarreraComponent', () => {
  let component: ABMCarreraComponent;
  let fixture: ComponentFixture<ABMCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ABMCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABMCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
