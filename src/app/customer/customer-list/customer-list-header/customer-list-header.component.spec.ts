import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListHeaderComponent } from './customer-list-header.component';

describe('CustomerListHeaderComponent', () => {
  let component: CustomerListHeaderComponent;
  let fixture: ComponentFixture<CustomerListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
