<template>
  <div class="container">
    <h3>GraphQL Skillgrow</h3>

    <input type="text" v-model="searchTerm" />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Something went wrong!</p>
    <template v-else>
      <p v-for="book in result.allBooks" :key="book.id">
        {{ book.title }}
      </p>
    </template>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import ALL_BOOKS_QUERY from "./graphql/allBooks.query.gql";

export default {
  name: "App",
  setup() {
    const searchTerm = ref("");
    const { result, loading, error } = useQuery(ALL_BOOKS_QUERY, () => ({
      search: searchTerm.value,
    }));

    return {
      result,
      searchTerm,
      loading,
      error,
    };
  },
};
</script>

<style></style>
