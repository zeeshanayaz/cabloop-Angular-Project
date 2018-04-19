import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermscondComponent } from './contactus.component';

describe('TermscondComponent', () => {
  let component: TermscondComponent;
  let fixture: ComponentFixture<TermscondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermscondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermscondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
