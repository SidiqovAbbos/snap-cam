import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSnapCamComponent } from './ngx-snap-cam.component';

describe('NgxSnapCamComponent', () => {
  let component: NgxSnapCamComponent;
  let fixture: ComponentFixture<NgxSnapCamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSnapCamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSnapCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
