import cn from 'classnames'
import { Dispatch, SetStateAction } from 'react'

import { icons } from '../../assets/icons'
import { useDelayedShow } from '../../hooks/useDelayedShow'
import { useStorage } from '../../hooks/useStorage'

import css from './index.module.scss'

export const Segment = ({
  setState,
  title,
  getBack = false,
  size = 1,
  type = 'default',
  Filters,
  NoButtonSelector,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setState?: Dispatch<SetStateAction<any>>
  title: string
  getBack?: boolean
  size?: 1 | 2
  type?: 'default' | 'error'
  Filters?: React.ReactNode
  NoButtonSelector?: React.ReactNode
  children: React.ReactNode
}) => {
  const { isShow, showElement, hideElement } = useDelayedShow({ delay: 300 })
  const { removeItem, setItem, getItem } = useStorage()
  const needShow =
    getItem('filterByTasks') !== 'all' ||
    getItem('filterByDate') !== 'old' ||
    getItem('filterByPriority') !== null ||
    getItem('filterByStatus') !== null

  return (
    <div className={cn({ [css.segment]: true, [css.error]: type === 'error' })}>
      <div className={css.headerBox}>
        <div className={css.titleAndReturn}>
          {getBack && (
            <button className={css.backButton} onClick={() => history.back()}>
              {icons.arrowBack()}
            </button>
          )}
          {size === 1 ? (
            <h2 className={css.headerLarge}>{title}</h2>
          ) : (
            <h3 className={css.headerSmall}>{title}</h3>
          )}
        </div>
        {Filters && (
          <div className={css.filtersBox}>
            {needShow && (
              <button
                onClick={() => {
                  setItem('filterByTasks', 'all')
                  setItem('filterByDate', 'old')
                  removeItem('filterByPriority')
                  removeItem('filterByStatus')
                  setState?.({
                    byTasks: 'all',
                    byDate: 'old',
                    byPriority: null,
                    byStatus: null,
                  })
                }}
                className={css.dropFilters}
                type="button"
              >
                {icons.cross()} Сбросить
              </button>
            )}
            <button
              className={css.filtersButton}
              onMouseEnter={showElement}
              onMouseLeave={hideElement}
            >
              {icons.filters()}
            </button>
            {isShow && (
              <div onMouseEnter={showElement} onMouseLeave={hideElement} className={css.filters}>
                {Filters}
              </div>
            )}
          </div>
        )}
        {NoButtonSelector}
      </div>
      <div className={css.content}>{children}</div>
    </div>
  )
}
