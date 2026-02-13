import { useState } from "react"
import styles from './ImageCarousel.module.css'

function ImageCarousel({ images = [] }) {
  const [current, setCurrent] = useState(0)

  if (!images.length) return null

  return (
    <div className={styles.carouselContainer}>
      <img src={images[current]} alt="Imagen del producto" />

      <div>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
