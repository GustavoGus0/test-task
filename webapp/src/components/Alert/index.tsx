import cn from 'classnames'
import { forwardRef } from 'react'

import { icons } from '../../assets/icons'
import { IAlert } from '../../lib/ctx'
import { AnimGlobalAlert } from '../Animation'

import css from './index.module.scss'

export const Alert = ({
  type,
  children,
}: {
  type: 'error' | 'success'
  children: React.ReactNode | string
}) => {
  return (
    <div
      className={cn({
        [css.alert]: true,
        [css.error]: type === 'error',
        [css.success]: type === 'success',
      })}
    >
      {children}
    </div>
  )
}

const returnIconByType = (type: IAlert['type']) => {
  switch (type) {
    case 'error':
      return icons.cross()
    case 'success':
      return icons.checkMark()
    case 'delete':
      return icons.trashCan()
    case 'cancel':
      return icons.cross()
  }
}

export const GlobalAlert = forwardRef<HTMLDivElement, Omit<IAlert, 'createdAt'>>(
  ({ title, type }, ref) => {
    return (
      <AnimGlobalAlert>
        <div
          ref={ref}
          className={cn({
            [css.globalAlert]: true,
            [css.green]: type === 'success',
            [css.red]: type !== 'success',
          })}
        >
          <div className={css.icon}>{returnIconByType(type)}</div>
          <div className={css.textBox}>
            <h4 className={css.alertTitle}>{title}</h4>
          </div>
        </div>
      </AnimGlobalAlert>
    )
  }
)

GlobalAlert.displayName = 'GlobalAlert'
