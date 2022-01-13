import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballersComponent } from './footballers.component';

describe('FootballersComponent', () => {
  let component: FootballersComponent;
  let fixture: ComponentFixture<FootballersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
