import cn from 'classnames'

import css from './index.module.scss'

export const Segment = ({
  title,
  size = 1,
  type = 'default',
  children,
}: {
  title: string
  size?: 1 | 2
  type?: 'default' | 'error'
  children: React.ReactNode
}) => {
  return (
    <div className={cn({ [css.segment]: true, [css.error]: type === 'error' })}>
      {size === 1 ? (
        <h2 className={css.headerLarge}>{title}</h2>
      ) : (
        <h3 className={css.headerSmall}>{title}</h3>
      )}
      <div className={css.content}>{children}</div>
    </div>
  )
}
