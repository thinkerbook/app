import { defineStore } from "pinia";

import Books from "@/assets/thinkerbook.yaml";
console.log(`Books: `, Books);

export const booksStore = defineStore({
  id: "books",
  state: () => ({
    books: Books,
  }),
  getters: {
    getBooks: (state) => state.books,
  },
  actions: {},
});
