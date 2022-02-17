import { defineStore } from 'pinia'
import http from '@/utils/http'

interface CategoryState {
  list: any[]
}

export const useCategoryStore = defineStore('category' ,{
  state: (): CategoryState => {
    return {
      list: []
    }
  },
  getters: {

  },
  actions: {
    async getCategories() {
      const { data } = await http.get('/category/list')
      this.list = data.data.list
    }
  }
})