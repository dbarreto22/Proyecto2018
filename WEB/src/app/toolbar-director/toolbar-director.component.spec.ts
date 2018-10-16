import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarDirectorComponent } from './toolbar-director.component';

describe('ToolbarDirectorComponent', () => {
  let component: ToolbarDirectorComponent;
  let fixture: ComponentFixture<ToolbarDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
