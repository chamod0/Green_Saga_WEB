import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimeLineItemComponent } from './add-time-line-item.component';

describe('AddTimeLineItemComponent', () => {
  let component: AddTimeLineItemComponent;
  let fixture: ComponentFixture<AddTimeLineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTimeLineItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTimeLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
