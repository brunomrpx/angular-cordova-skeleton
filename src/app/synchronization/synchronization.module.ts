import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SynchronizationService } from './synchronization.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SynchronizationService
  ]
})
export class SynchronizationModule { }
