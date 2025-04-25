import { TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'
import { Dispatch, SetStateAction } from 'react'

import { useStorage } from '../../hooks/useStorage'
import { IFilter } from '../../pages/Tasks'

import css from './index.module.scss'

interface IParameter {
  title: string
  values: string[]
  byWhat: 'byTasks' | 'byDate' | 'byPriority' | 'byStatus'
  translatorFunction: (value: string) => string
}

interface ISelector {
  filters: IFilter
  setFilters: Dispatch<SetStateAction<IFilter>>
  parameters: IParameter[]
}

export const Selector = ({ filters, setFilters, parameters }: ISelector) => {
  return (
    <div className={css.parametersWrapper}>
      {parameters.map((parameter) => (
        <Parameter
          filters={filters}
          setFilters={setFilters}
          parameter={parameter}
          key={parameter.title}
        />
      ))}
    </div>
  )
}

const Parameter = ({
  filters,
  setFilters,
  parameter,
}: {
  filters: ISelector['filters']
  setFilters: ISelector['setFilters']
  parameter: IParameter
}) => {
  const { setItem } = useStorage()
  const handleFiltersChange = (parameter: IParameter['byWhat'], value: string) => {
    if (filters[parameter] === value) {
      setFilters((prev) => ({
        ...prev,
        [parameter]: null,
      }))
      return setItem(`filter${parameter.charAt(0).toUpperCase()}${parameter.slice(1)}`, null)
    }
    setFilters((prev) => ({
      ...prev,
      [parameter]: value,
    }))
    return setItem(`filter${parameter.charAt(0).toUpperCase()}${parameter.slice(1)}`, value)
  }
  return (
    <div className={css.parameter}>
      <div className={css.parameterTitle}>{parameter.title}</div>
      <div className={css.parameterValues}>
        {parameter.values.map((value) => (
          <button
            onClick={() => {
              handleFiltersChange(parameter.byWhat, value)
            }}
            className={cn({ [css.value]: true, [css.active]: value === filters[parameter.byWhat] })}
            key={value}
          >
            {parameter.translatorFunction(value)}
          </button>
        ))}
      </div>
    </div>
  )
}

export const NoButtonSelector = ({
  buttons,
  translatorFunction,
  filterArchive,
  setFilterArchive,
}: {
  buttons: { value: 'completed' | 'cancelled' }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translatorFunction: (arg: string, ...props: any) => string
  filterArchive: 'completed' | 'cancelled'
  setFilterArchive: Dispatch<SetStateAction<'completed' | 'cancelled'>>
}) => {
  const { setItem } = useStorage()
  return (
    <div className={css.noButtonWrapper}>
      <ul className={css.list}>
        {buttons.map((button) => (
          <li className={css.item} key={button.value}>
            <button
              type="button"
              onClick={() => {
                setItem(`filterArchive`, button.value)
                return setFilterArchive(button.value)
              }}
              className={cn({ [css.button]: true, [css.active]: button.value === filterArchive })}
            >
              {translatorFunction(button.value as TaskStatus, { communion: true })}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
