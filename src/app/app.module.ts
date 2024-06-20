import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatModule } from './chat/chat.module';

export function tokenGetter() {
  return sessionStorage.getItem('user_token');
}

@NgModule({
  declarations:[AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [environment.baseUrl, environment.apiUrl],
        disallowedRoutes: ['/login', '/sign-up']
      }
    }),
    SocketIoModule.forRoot({
      url: environment.baseUrl,
      options: {
        autoConnect: false
      }
    }),
    BrowserAnimationsModule,
    ChatModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
