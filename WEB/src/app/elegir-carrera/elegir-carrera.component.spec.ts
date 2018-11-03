import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirCarreraComponent } from './elegir-carrera.component';

describe('ElegirCarreraComponent', () => {
  let component: ElegirCarreraComponent;
  let fixture: ComponentFixture<ElegirCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElegirCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElegirCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
