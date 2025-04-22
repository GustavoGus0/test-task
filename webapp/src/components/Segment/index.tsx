import cn from 'classnames'
import { useState } from 'react'
import { Link } from 'react-router'

import { icons } from '../../assets/icons'

import css from './index.module.scss'

export const Segment = ({
  title,
  returnTo,
  size = 1,
  type = 'default',
  Filters = undefined,
  children,
}: {
  title: string
  returnTo?: string
  size?: 1 | 2
  type?: 'default' | 'error'
  Filters?: React.ReactNode
  children: React.ReactNode
}) => {
  const [isShow, setIsShow] = useState(false)
  return (
    <div className={cn({ [css.segment]: true, [css.error]: type === 'error' })}>
      <div className={css.headerBox}>
        <div className={css.titleAndReturn}>
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
        {Filters && (
          <div className={css.filtersBox}>
            <button className={css.filtersButton} onClick={() => setIsShow((prev) => !prev)}>
              {icons.filters()}
            </button>
            {isShow && <div className={css.filters}>{Filters}</div>}
          </div>
        )}
      </div>
      <div className={css.content}>{children}</div>
    </div>
  )
}
