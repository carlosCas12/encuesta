import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaPComponent } from './encuesta-p.component';

describe('EncuestaPComponent', () => {
  let component: EncuestaPComponent;
  let fixture: ComponentFixture<EncuestaPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuestaPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
