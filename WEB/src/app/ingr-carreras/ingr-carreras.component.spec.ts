import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngrCarrerasComponent } from './ingr-carreras.component';

describe('IngrCarrerasComponent', () => {
  let component: IngrCarrerasComponent;
  let fixture: ComponentFixture<IngrCarrerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngrCarrerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngrCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
