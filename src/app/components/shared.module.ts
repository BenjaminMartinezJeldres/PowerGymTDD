import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [InputComponent, ButtonComponent, IconButtonComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, IonicModule],
  exports: [InputComponent, ButtonComponent, IconButtonComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}