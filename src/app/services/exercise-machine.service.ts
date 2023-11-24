// src/app/services/exercise-machine.service.ts
import { Injectable } from '@angular/core';
import { ExerciseMachine } from '../models/exercise-machine.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ExerciseMachineService {
  private dbPath = '/exercise-machines';

  constructor(private db: AngularFireDatabase) { }

  addMachine(machine: ExerciseMachine) {
    this.db.list(this.dbPath).push(machine);
  }

  getMachinesList() {
    return this.db.list<ExerciseMachine>(this.dbPath).valueChanges();
  }

  updateMachine(key: string, value: any) {
    return this.db.list(this.dbPath).update(key, value);
  }

  deleteMachine(key: string) {
    return this.db.list(this.dbPath).remove(key);
  }
}
