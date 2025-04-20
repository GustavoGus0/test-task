import cn from 'classnames'

import css from './index.module.scss'

export const Alert = ({
  forWhat,
  type,
  children,
}: {
  forWhat: 'input' | 'user'
  type: 'error' | 'success'
  children: React.ReactNode | string
}) => {
  return (
    <div
      className={cn({
        [css.error]: type === 'error',
        [css.success]: type === 'success',
        [css.forInput]: forWhat === 'input',
      })}
    >
      {children}
    </div>
  )
}
