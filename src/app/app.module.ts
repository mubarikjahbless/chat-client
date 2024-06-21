import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
