import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscCarreraComponent } from './insc-carrera.component';

describe('InscCarreraComponent', () => {
  let component: InscCarreraComponent;
  let fixture: ComponentFixture<InscCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
