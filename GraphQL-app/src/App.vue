<template>
  <div class="container">
    <h3>GraphQL Skillgrow</h3>

    <input type="text" v-model="searchTerm" />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Something went wrong!</p>
    <template v-else>
      <!-- We don't need to use 'result.value' because 
      the reactive variable it's automatically unwrapped 
      when used in the template -->
      <p v-for="book in books" :key="book.id">
        {{ book.title }}
      </p>
    </template>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import ALL_BOOKS_QUERY from "./graphql/allBooks.query.gql";

//dummy comment
export default {
  name: "App",
  setup() {
    const searchTerm = ref("");
    const { result, loading, error } = useQuery(
      ALL_BOOKS_QUERY,
      () => ({
        search: searchTerm.value,
      }),
      () => ({
        debounce: 500,
        enabled: searchTerm.value.length > 2,
      })
    );

    const books = useResult(result, [], (data) => data.allBooks);

    return {
      books,
      searchTerm,
      loading,
      error,
    };
  },
};
</script>

<style></style>
