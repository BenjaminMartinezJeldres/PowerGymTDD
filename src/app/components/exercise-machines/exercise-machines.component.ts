// src/app/components/exercise-machines/exercise-machines.component.ts
import { Component, OnInit } from '@angular/core';
import { ExerciseMachineService } from '../../services/exercise-machine.service';
import { ExerciseMachine } from '../../models/exercise-machine.model';

@Component({
  selector: 'app-exercise-machines',
  templateUrl: './exercise-machines.component.html',
  styleUrls: ['./exercise-machines.component.scss']
})
export class ExerciseMachinesComponent implements OnInit {
  
  machines: ExerciseMachine[] = [];

  constructor(private exerciseMachineService: ExerciseMachineService) {}

  ngOnInit() {
    this.loadMachines();
  }

  loadMachines() {
    this.exerciseMachineService.getMachinesList().subscribe(
      (data: ExerciseMachine[]) => { // Aquí especificas el tipo para `data`
        this.machines = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // ... otros métodos del componente
}
