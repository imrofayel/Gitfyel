// stores/flowerBucketStore.ts
import { defineStore } from 'pinia'

export const useUserBucket = defineStore('userBucket', {
  state: () => ({
    user: 'imrofayel'
  }),
  actions: {
    setUsername(username: string) {
      this.user = username
    },
    updateUsername(newUsername: string) {
      this.user = newUsername
    },
    clearUsername() {
      this.user = 'imrofayel'
    }
  },
  getters: {
    userName: (state) => state.user
  }
})
