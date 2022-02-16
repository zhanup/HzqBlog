import { defineStore } from 'pinia'
import { http } from '@/utils/request'

interface LinkState {
  list: any[]
}

export const useLinkStore = defineStore('link' ,{
  state: (): LinkState => {
    return {
      list: []
    }
  },
  getters: {

  },
  actions: {
    async getLinks() {
      const { data } = await http.get('/link/list')
      this.list = data.data.list
    }
  }
})