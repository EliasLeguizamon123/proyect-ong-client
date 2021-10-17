import React, { useRef, useEffect, useState } from 'react'
import './styles.css'
import { sendRequest } from '../../utils/sendRequest'

const SlideShow = () => {
  const slideshow = useRef(null)
  const intervalSlideShow = useRef(null)
  const [slides, setSlides] = useState([])
  const next = () => {
    if (slideshow.current.children.length > 0) {
      const firstElement = slideshow.current.children[0]

      slideshow.current.style.transition = '300ms ease-out all '

      const sizeSlide = slideshow.current.children[0].offsetWidth

      slideshow.current.style.transform = `translateX(-${sizeSlide}px)`
      const transition = () => {
        slideshow.current.style.transition = 'none'
        slideshow.current.style.transform = 'translateX(0)'
        slideshow.current.appendChild(firstElement)

        slideshow.current.removeEventListener('transitionend', transition)
      }

      slideshow.current.addEventListener('transitionend', transition)
    }
  }
  const previous = () => {
    if (slideshow.current.children.length > 0) {
      const index = slideshow.current.children.length - 1
      const lastElement = slideshow.current.children[index]
      slideshow.current.insertBefore(lastElement, slideshow.current.firstChild)

      slideshow.current.style.transition = 'none'
      const sizeSlide = slideshow.current.children[0].offsetWidth
      slideshow.current.style.transform = `translateX(-${sizeSlide}px)`
      setTimeout(() => {
        slideshow.current.style.transition = '300ms ease-out all'
        slideshow.current.style.transform = `translateX(0)`
      }, 30)
    }
  }

  const getSlides = () =>
    sendRequest('GET', '/slides/getAll/1').then((res) => {
      if (res && res.length) {
        setSlides(res[0].Slides)
      }
    })
  useEffect(() => {
    const interval = (intervalSlideShow.current = setInterval(() => {
      next()
    }, 5000))
    getSlides()
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="slideContainer">
      <div className="slideShowContainer">
        <div className="slides" ref={slideshow}>
          {slides.map((slide) => (
            <div key={slide.id} className="slide">
              <img src={slide.imageUrl} alt="slide" />
              <div className="textSlide">
                <p>{slide.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="controls">
          <button className="btnRight" onClick={next}>
            &gt;
          </button>
          <button className="btnLeft" onClick={previous}>
            &lt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default SlideShow
