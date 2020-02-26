import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './user/login/login.component';

import { PresentationComponent } from './presentation/presentation.component';
import { ComponentsComponent } from './components/components.component';
import { SectionsComponent } from './sections/sections.component';
import { AboutusComponent } from './examples/aboutus/aboutus.component';
import { BlogpostComponent } from './examples/blogpost/blogpost.component';
import { BlogpostsComponent } from './examples/blogposts/blogposts.component';
import { ContactusComponent } from './examples/contactus/contactus.component';
import { EcommerceComponent } from './examples/ecommerce/ecommerce.component';
import { LandingComponent } from './examples/landing/landing.component';
import { ProductpageComponent } from './examples/productpage/productpage.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { RegisterComponent } from './examples/register/register.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { PricingComponent } from './examples/pricing/pricing.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'register',             component: RegisterComponent },
    // { path: 'login',                component: LoginComponent },
    { path: 'home',         component: PresentationComponent },
    // { path: 'components',           component: ComponentsComponent },
    // { path: 'sections',             component: SectionsComponent },
    // { path: 'nucleoicons',          component: NucleoiconsComponent },
    // { path: 'examples/aboutus',     component: AboutusComponent },
    // { path: 'examples/blogpost',    component: BlogpostComponent },
    // { path: 'examples/blogposts',   component: BlogpostsComponent },
    // { path: 'examples/contactus',   component: ContactusComponent },
    // { path: 'examples/ecommerce',   component: EcommerceComponent },
    // { path: 'examples/landing',     component: LandingComponent },
    // { path: 'examples/login',       component: LoginComponent },
    // { path: 'examples/pricing',     component: PricingComponent },
    // { path: 'examples/productpage', component: ProductpageComponent },
    // { path: 'examples/profile',     component: ProfileComponent },
    // { path: 'examples/register',    component: RegisterComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
          useHash: false
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
