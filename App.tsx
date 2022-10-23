import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwind-rn';
import RootNavigator from './navigation/RootNavigator';
import utilities from './tailwind.json';

const client = new ApolloClient({
  uri: process.env.STEPZEN_API_KEY!,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `apikey atkinson::stepzen.net+1000::f6b486f0acb80b6eab955323ed129b11ea5deb6b8a7ad6f1f67043dfe0972791`
  }
});

export default function App() {
  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}
