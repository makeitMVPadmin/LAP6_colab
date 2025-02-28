import { useState, useEffect } from 'react'

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState('')

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = globalThis.innerWidth
      if (screenWidth < 640) {
        setScreenWidth('sm')
      } else if (screenWidth < 768) {
        setScreenWidth('md')
      } else if (screenWidth < 1024) {
        setScreenWidth('lg')
      } else {
        setScreenWidth('xl')
      }
    }

    globalThis.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      globalThis.removeEventListener('resize', handleResize)
    }
  }, [])

  return screenWidth
}

export default useScreenWidth
