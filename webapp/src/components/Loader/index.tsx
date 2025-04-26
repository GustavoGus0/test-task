import { motion } from 'framer-motion'
import { forwardRef } from 'react'

import css from './index.module.scss'

export const Loader = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className={css.loaderWrapper}
    >
      <div className={css.loader} />
    </motion.div>
  )
})

Loader.displayName = 'Loader'
