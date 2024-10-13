import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesSuccessComponent } from './packages-success.component';

describe('PackagesSuccessComponent', () => {
  let component: PackagesSuccessComponent;
  let fixture: ComponentFixture<PackagesSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackagesSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagesSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
