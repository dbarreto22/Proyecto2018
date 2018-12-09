import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsigMadreComponent } from './crear-asig-madre.component';

describe('CrearAsigMadreComponent', () => {
  let component: CrearAsigMadreComponent;
  let fixture: ComponentFixture<CrearAsigMadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAsigMadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAsigMadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
