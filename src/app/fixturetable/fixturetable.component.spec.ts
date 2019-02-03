import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixturetableComponent } from './fixturetable.component';

describe('FixturetableComponent', () => {
  let component: FixturetableComponent;
  let fixture: ComponentFixture<FixturetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixturetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixturetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
