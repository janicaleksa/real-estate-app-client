import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRenterComponent } from './home-renter.component';

describe('HomeRenterComponent', () => {
  let component: HomeRenterComponent;
  let fixture: ComponentFixture<HomeRenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
