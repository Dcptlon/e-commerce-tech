import { Link } from 'react-router'
import styles from './CTABanner.module.css'

function CTABanner({ 
  title,
  description,
  buttonText,
  buttonLink,
  variant = 'primary'
}) {
  const bannerClass = variant === 'secondary' 
    ? `${styles.ctaBanner} ${styles.secondary}` 
    : styles.ctaBanner

  return (
    <aside className={bannerClass}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>{title}</h2>
        {description && (
          <p className={styles.ctaDescription}>{description}</p>
        )}
        <Link to={buttonLink} className={styles.ctaButton}>
          {buttonText}
        </Link>
      </div>
    </aside>
  )
}

export default CTABanner