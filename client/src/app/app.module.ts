import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MessagesComponent } from './messages/messages.component';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/helpers/token.interceptor';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HeroModule } from './hero/hero.module';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { AuthGuard } from './core/helpers/auth.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    NotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    HeroModule,
    AuthModule,
    UserModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
