import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAsigCarreraComponent } from './asignar-asig-carrera.component';

describe('AsignarAsigCarreraComponent', () => {
  let component: AsignarAsigCarreraComponent;
  let fixture: ComponentFixture<AsignarAsigCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarAsigCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAsigCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
