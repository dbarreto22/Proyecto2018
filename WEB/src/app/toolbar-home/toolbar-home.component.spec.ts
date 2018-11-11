import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarHomeComponent } from './toolbar-home.component';

describe('ToolbarHomeComponent', () => {
  let component: ToolbarHomeComponent;
  let fixture: ComponentFixture<ToolbarHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
