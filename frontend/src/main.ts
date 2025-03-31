import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { HttpLink } from 'apollo-angular/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig,

    // ✅ Explicitly provide the Apollo service class
    Apollo,

    // ✅ Provide Apollo client options
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'https://backend-ifz6a10br-milans-projects-dfa726a2.vercel.app/graphql',
          headers: new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`
          })
        })
      }),
      deps: [HttpLink]
    }
  ]
}).catch((err) => console.error(err));
