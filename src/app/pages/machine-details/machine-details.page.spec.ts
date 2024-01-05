import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MachineDetailsPage } from './machine-details.page';

describe('MachineDetailsPage', () => {
  let component: MachineDetailsPage;
  let fixture: ComponentFixture<MachineDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MachineDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
