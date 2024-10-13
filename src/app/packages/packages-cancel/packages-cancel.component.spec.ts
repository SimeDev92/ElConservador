import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesCancelComponent } from './packages-cancel.component';

describe('PackagesCancelComponent', () => {
  let component: PackagesCancelComponent;
  let fixture: ComponentFixture<PackagesCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackagesCancelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagesCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
