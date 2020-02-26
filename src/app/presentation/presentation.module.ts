import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { PresentationComponent } from './presentation.component';
import {FooterModule} from '../shared/footer/footer.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        NgbModule,
        FooterModule
    ],
    declarations: [ PresentationComponent ],
    exports: [ PresentationComponent ],
    providers: []
})
export class PresentationModule { }
