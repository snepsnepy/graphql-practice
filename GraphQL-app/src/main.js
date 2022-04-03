import { createApp, h, provide } from 'vue'
import { ApolloClient,
         createHttpLink, 
         InMemoryCache 
} from '@apollo/client/core'
import gql from 'graphql-tag'
import { DefaultApolloClient } from "@vue/apollo-composable"

import App from './App.vue'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
})

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
});

// To add Apollo to our Vue App we have to refactor the 'createApp' call.
// createApp(App).mount('#app')

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App)
})

app.mount('#app')