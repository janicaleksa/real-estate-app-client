import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdvertiserComponent } from './home-advertiser.component';

describe('HomeAdvertiserComponent', () => {
  let component: HomeAdvertiserComponent;
  let fixture: ComponentFixture<HomeAdvertiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAdvertiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAdvertiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
