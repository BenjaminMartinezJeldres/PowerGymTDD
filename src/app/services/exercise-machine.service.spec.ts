import { TestBed } from '@angular/core/testing';

import { ExerciseMachineService } from './exercise-machine.service';

describe('ExerciseMachineService', () => {
  let service: ExerciseMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseMachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
