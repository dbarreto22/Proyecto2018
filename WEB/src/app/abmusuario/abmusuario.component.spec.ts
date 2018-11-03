import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ABMUsuarioComponent } from './abmusuario.component';

describe('ABMUsuarioComponent', () => {
  let component: ABMUsuarioComponent;
  let fixture: ComponentFixture<ABMUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ABMUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABMUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
