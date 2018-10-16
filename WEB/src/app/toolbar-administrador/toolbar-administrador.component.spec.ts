import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarAdministradorComponent } from './toolbar-administrador.component';

describe('ToolbarAdministradorComponent', () => {
  let component: ToolbarAdministradorComponent;
  let fixture: ComponentFixture<ToolbarAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
