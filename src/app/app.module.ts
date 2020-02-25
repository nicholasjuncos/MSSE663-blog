import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { SectionsModule } from './sections/sections.module';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthInterceptor } from './user/auth.interceptor';

import { PresentationModule } from './presentation/presentation.module';
import { LimitToPipe } from './limit-to.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LimitToPipe
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        AppRoutingModule,
        UserModule,
        PostsModule,
        PresentationModule,
        SectionsModule,
        ComponentsModule,
        ExamplesModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }],
    exports: [
        LimitToPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
