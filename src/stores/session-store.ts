import { defineStore } from 'pinia';

interface SessionStore {
  token: string | undefined;
}

export const useSessionStore = defineStore('session', {
  state: (): SessionStore => ({ token: undefined }),
  getters: {},
  actions: {
    setToken(newToken: string) {
      this.token = newToken;
    },
  },
});
