import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaquinaDetailPage } from './maquina-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MaquinaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaquinaDetailPageRoutingModule {}
