import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Weather } from './components/Weather';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { SearchContextProvider } from './context/searchContext';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
   
      <SearchContextProvider>
        <ApolloProvider client={client}>
          <ChakraProvider resetCSS>
            <ColorModeScript initialColorMode="dark"></ColorModeScript>
           
              <Weather />
           
          </ChakraProvider>
        </ApolloProvider>
      </SearchContextProvider>
   
  );
}

export default App;
