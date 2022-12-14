import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: '344083b8-647d-4982-9c15-489bbcb0e50c', // Application (client) ID from the app registration
        authority: 'https://login.microsoftonline.com/78f9d296-66a3-4b1d-b98e-14729f9fda07', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
        redirectUri: 'http://localhost:4200'// This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }),  {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      authRequest: {
        scopes: ['user.read']
      }
    },  {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([ 
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard, // MsalGuard added as provider here
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
