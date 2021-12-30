import { ref, Ref, onMounted, onBeforeUnmount } from 'vue'

export default function (): Ref<boolean> {
  const isTransparent = ref<boolean>(true)

  const scrollChange = () => {
    const scroll = document.documentElement.scrollTop || document.body.scrollTop
    if (scroll > 200) {
      isTransparent.value = false
    } else {
      isTransparent.value = true
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', scrollChange)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', scrollChange)
  })

  return isTransparent
}
