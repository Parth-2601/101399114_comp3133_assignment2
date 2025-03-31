import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    cache: new InMemoryCache(),
    link: httpLink.create({
      uri: 'https://backend-ifz6a10br-milans-projects-dfa726a2.vercel.app/graphql',
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      })
    })
  };
}

export const appConfig = [
  provideRouter(appRoutes),
  provideAnimations(),
  provideHttpClient(),
  {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink]
  }
];


