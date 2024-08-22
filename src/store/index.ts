import {defineStore} from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        page: 1,
        archivePage: 1
    }),
    actions: {
        setArchivePageIndex(index: number) {
            this.archivePage = index
        },
        setPageIndex(index: number) {
            this.page = index
        }
    }
})
