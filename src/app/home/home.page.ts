import { Component, OnInit } from '@angular/core';
import { MaquinaService } from '../services/maquina.service';
import { Maquinas } from '../interfaces/maquinas';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  maquinas: Maquinas[] = [];
  todasLasMaquinas: Maquinas[] = []; // Almacena todas las máquinas

  maquina: Maquinas = {
    nombre: 'null'
  }

  constructor(
    private maquinasService: MaquinaService,
    private interaction: InteractionService
  ) { }


  async ngOnInit() {
    this.interaction.presentLoading('Cargando...')
    await this.maquinasService.getMaquinas().subscribe(maquinas => {
      this.todasLasMaquinas = maquinas;
      this.maquinas = maquinas
      this.interaction.closeLoading()
      this.interaction.presentToast('Datos cargados conéxito')
    })
    
    
    
  }
  
  filtrarMaquinas(evt: any) {
    const buscar = evt.detail.value.toLowerCase();

    if (!buscar) {
      this.maquinas = this.todasLasMaquinas; // Si no hay término de búsqueda, muestra todas las máquinas
      return;
    }

    this.maquinas = this.todasLasMaquinas.filter(maquina =>
      maquina.nombre && maquina.nombre.toLowerCase().includes(buscar)
    );
  }
}
