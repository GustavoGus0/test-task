import { TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'
import { FormikProps } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, forwardRef, SetStateAction, useState } from 'react'

import { icons } from '../../assets/icons'
import { useStorage } from '../../hooks/useStorage'
import { trpc } from '../../lib/trpc'
import { IFilter } from '../../pages/Tasks'
import { Loader } from '../Loader'

import css from './index.module.scss'

interface IParameter {
  title: string
  values: string[]
  byWhat: 'byTasks' | 'byDate' | 'byPriority' | 'byStatus' | 'byTime'
  translatorFunction: (value: string) => string
}

interface ISelector {
  filters: IFilter
  setFilters: Dispatch<SetStateAction<IFilter>>
  parameters: IParameter[]
}

export const Selector = forwardRef<HTMLDivElement, ISelector>(
  ({ filters, setFilters, parameters }, ref) => {
    return (
      <div ref={ref} className={css.parametersWrapper}>
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
)

Selector.displayName = 'Selector'

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

export const ExecutorsSelector = ({
  formik,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>
}) => {
  const [showExecutors, setShowExecutors] = useState<boolean>(false)
  const { data, error, isLoading, isFetching } = trpc.getExecutors.useQuery()

  const handleSetExecutor = (parameter: string) => {
    if (formik.values.assignedToId === parameter) {
      formik.setFieldValue('assignedToId', null)
    } else {
      formik.setFieldValue('assignedToId', parameter)
    }
  }
  if (isLoading || isFetching) {
    return <Loader />
  }
  if (!data || error || data?.length === 0) {
    return null
  }

  return (
    <motion.div className={css.executorsSelector}>
      <motion.button
        onClick={() => setShowExecutors((prev) => !prev)}
        className={css.selectorButton}
      >
        <div className={css.icon}>{icons.newTask()}</div>
        <span>Назначить подчинённого</span>
      </motion.button>
      <ul className={css.executorsList}>
        <AnimatePresence>
          {showExecutors &&
            data.map((executor, index) => (
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ type: 'tween', duration: 0.2, delay: index * 0.05 }}
                key={executor.id}
                className={css.executorItem}
              >
                <button
                  onClick={() => handleSetExecutor(executor.id)}
                  className={cn({
                    [css.executorButton]: true,
                    [css.active]: formik.values.assignedToId === executor.id,
                  })}
                >
                  {executor.lastName} {executor.firstName} {executor.patronymic}
                </button>
              </motion.li>
            ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}
