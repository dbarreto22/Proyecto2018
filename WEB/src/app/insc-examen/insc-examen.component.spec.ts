import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscExamenComponent } from './insc-examen.component';

describe('InscExamenComponent', () => {
  let component: InscExamenComponent;
  let fixture: ComponentFixture<InscExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
