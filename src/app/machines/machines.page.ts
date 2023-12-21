import { Component, OnInit } from '@angular/core';
import { MachinesService } from '../services/machines.service';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.page.html',
  styleUrls: ['./machines.page.scss'],
})
export class MachinesPage implements OnInit {
  searchTerm: string = '';
  machines: any[] = []; // Definir la propiedad machines
  filteredMachines: any[] = [];

  constructor(private machinesService: MachinesService) { }

  ngOnInit() {
    this.machinesService.getMachines().subscribe(machines => {
      this.machines = machines;
      this.filteredMachines = machines;
    });
  }

  filterMachines() {
    if (!this.searchTerm) {
      this.filteredMachines = this.machines;
    } else {
      this.filteredMachines = this.machines.filter((machine: any) => // Especificar el tipo para 'machine'
        machine.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
