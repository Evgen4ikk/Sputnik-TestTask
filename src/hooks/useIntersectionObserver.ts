import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'

type IntersectionObserverHook = {
  observerElem: MutableRefObject<HTMLDivElement | null>
}

export const useIntersectionObserver = (
  callback: () => void,
  hasNextPage: boolean
): IntersectionObserverHook => {
  const observerElem = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        callback()
      }
    })

    if (observerElem.current) {
      observer.observe(observerElem.current)
    }

    return () => {
      if (observerElem.current) {
        observer.unobserve(observerElem.current)
      }
    }
  }, [callback, hasNextPage])

  return { observerElem }
}
