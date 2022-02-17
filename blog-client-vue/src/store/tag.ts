import { defineStore } from 'pinia'
import http from '@/utils/http'

interface TagState {
  list: any[]
}

export const useTagStore = defineStore('tag' ,{
  state: (): TagState => {
    return {
      list: []
    }
  },
  getters: {

  },
  actions: {
    async getTags() {
      const { data } = await http.get('/tag/list')
      this.list = data.data.list
    }
  }
})