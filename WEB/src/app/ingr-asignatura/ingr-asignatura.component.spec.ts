import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngrAsignaturaComponent } from './ingr-asignatura.component';

describe('IngrAsignaturaComponent', () => {
  let component: IngrAsignaturaComponent;
  let fixture: ComponentFixture<IngrAsignaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngrAsignaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngrAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
