import { TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router'

import { icons } from '../../assets/icons'
import { useDelayedShow } from '../../hooks/useDelayedShow'
import { useStorage } from '../../hooks/useStorage'
import { useWindowWidth } from '../../lib/ctx'
import { getArchivedTasksRoute, getTasksRoute } from '../../lib/routes'

import css from './index.module.scss'

export const Segment = ({
  setState,
  title,
  status,
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
  status?: TaskStatus
  getBack?: boolean
  size?: 1 | 2
  type?: 'default' | 'error'
  Filters?: React.ReactNode
  NoButtonSelector?: React.ReactNode
  children: React.ReactNode
}) => {
  const windowWidth = useWindowWidth()
  const navigate = useNavigate()
  const { isShow, showElement, hideElement } = useDelayedShow({
    delay: windowWidth > 768 ? 300 : 0,
  })
  const { removeItem, setItem, getItem } = useStorage()
  const needShow =
    getItem('filterByTime') !== 'all-time' ||
    getItem('filterByTasks') !== 'all' ||
    getItem('filterByDate') !== 'old' ||
    getItem('filterByPriority') !== null ||
    getItem('filterByStatus') !== null

  return (
    <div className={cn({ [css.segment]: true, [css.error]: type === 'error' })}>
      <div data-is-archive={NoButtonSelector ? 'true' : 'false'} className={css.headerBox}>
        <div className={css.titleAndReturn}>
          {getBack && (
            <button
              className={css.backButton}
              onClick={() =>
                status === 'to-do' || status === 'in-progress'
                  ? navigate(getTasksRoute())
                  : navigate(getArchivedTasksRoute())
              }
            >
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
            <AnimatePresence>
              {needShow && (
                <motion.button
                  onClick={() => {
                    setItem('filterByTime', 'all-time')
                    setItem('filterByTasks', 'all')
                    setItem('filterByDate', 'old')
                    removeItem('filterByPriority')
                    removeItem('filterByStatus')
                    setState?.({
                      byTime: 'all-time',
                      byTasks: 'all',
                      byDate: 'old',
                      byPriority: null,
                      byStatus: null,
                    })
                  }}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.1 }}
                  className={css.dropFilters}
                  type="button"
                >
                  {icons.cross()} Сбросить
                </motion.button>
              )}
            </AnimatePresence>
            {windowWidth > 768 ? (
              <button
                className={css.filtersButton}
                onMouseEnter={showElement}
                onMouseLeave={hideElement}
              >
                {icons.filters()}
              </button>
            ) : (
              <button className={css.filtersButton} onClick={isShow ? hideElement : showElement}>
                {icons.filters()}
              </button>
            )}
            <AnimatePresence>
              {isShow && (
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ type: 'tween', duration: 0.2 }}
                  onMouseEnter={showElement}
                  onMouseLeave={hideElement}
                  className={css.filters}
                >
                  {Filters}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        {NoButtonSelector}
      </div>
      <div className={css.content}>{children}</div>
    </div>
  )
}
