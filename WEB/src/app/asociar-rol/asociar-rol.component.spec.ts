import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarRolComponent } from './asociar-rol.component';

describe('AsociarRolComponent', () => {
  let component: AsociarRolComponent;
  let fixture: ComponentFixture<AsociarRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
