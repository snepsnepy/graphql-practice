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
      <p v-if="activeBook">
        Update "{{ activeBook.title }}" rating:
        <EditRating
          :initial-rating="activeBook.rating"
          :book-id="activeBook.id"
          @closeForm="activeBook = null"
        />
      </p>
      <template v-else>
        <p v-for="book in books" :key="book.id">
          {{ book.title }} - {{ book.rating }}
          <button @click="activeBook = book">Edit rating</button>
        </p>
      </template>
    </template>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import ALL_BOOKS_QUERY from "./graphql/allBooks.query.gql";
import EditRating from "./components/EditRating.vue";

//dummy comment
export default {
  name: "App",
  components: {
    EditRating,
  },
  setup() {
    const searchTerm = ref("");
    const activeBook = ref(null);

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
      activeBook,
    };
  },
};
</script>

<style></style>
