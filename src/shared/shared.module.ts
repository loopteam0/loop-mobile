import { NgModule } from '@angular/core';

import { SafePipe } from './safe.pipe';
import { DurationPipe } from './duration.pipe';
import { JoinPipe } from './join.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [ SafePipe, DurationPipe, JoinPipe],

    exports: [CommonModule, SafePipe, DurationPipe, JoinPipe, CommonModule]
})
export class SharedModule {}

