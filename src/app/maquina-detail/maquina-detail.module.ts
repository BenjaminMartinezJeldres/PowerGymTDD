import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaquinaDetailPageRoutingModule } from './maquina-detail-routing.module';

import { MaquinaDetailPage } from './maquina-detail.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaquinaDetailPageRoutingModule,
    SharedModule
  ],
  declarations: [MaquinaDetailPage]
})
export class MaquinaDetailPageModule {}
