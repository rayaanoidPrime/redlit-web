import { ChakraProvider } from '@chakra-ui/react'
import { Provider, createClient, cacheExchange, dedupExchange, fetchExchange } from 'urql'

import theme from '../theme'
import { AppProps } from 'next/app'

const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [dedupExchange, cacheExchange, fetchExchange],

});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider >
  )
}

export default MyApp
