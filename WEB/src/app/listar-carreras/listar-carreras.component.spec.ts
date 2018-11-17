import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCarrerasComponent } from './listar-carreras.component';

describe('ListarCarrerasComponent', () => {
  let component: ListarCarrerasComponent;
  let fixture: ComponentFixture<ListarCarrerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCarrerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
