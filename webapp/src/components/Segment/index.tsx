import cn from 'classnames'
import { Link } from 'react-router'

import { icons } from '../../assets/icons'

import css from './index.module.scss'

export const Segment = ({
  title,
  returnTo,
  size = 1,
  type = 'default',
  children,
}: {
  title: string
  returnTo?: string
  size?: 1 | 2
  type?: 'default' | 'error'
  children: React.ReactNode
}) => {
  return (
    <div className={cn({ [css.segment]: true, [css.error]: type === 'error' })}>
      <div className={css.headerBox}>
        {returnTo && (
          <Link className={css.backButton} to={returnTo}>
            {icons.arrowBack()}
          </Link>
        )}
        {size === 1 ? (
          <h2 className={css.headerLarge}>{title}</h2>
        ) : (
          <h3 className={css.headerSmall}>{title}</h3>
        )}
      </div>
      <div className={css.content}>{children}</div>
    </div>
  )
}
