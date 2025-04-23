import type { TrpcRouterOutput } from '@management/backend/src/router'
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

import { GlobalAlert } from '../components/Alert'
import { Loader } from '../components/Loader'

import { trpc } from './trpc'

export type AppContext = {
  me: TrpcRouterOutput['getMe']['me']
  alerts: IAlert[]
  setAlerts: Dispatch<SetStateAction<IAlert[]>>
}

export type AlertType = 'error' | 'success' | 'delete' | 'cancel'
export interface IAlert {
  type: AlertType
  title: string
  createdAt: Date
}

const AppReactContext = createContext<AppContext>({
  me: null,
  alerts: [],
  setAlerts: () => null,
})

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading, isFetching, isError } = trpc.getMe.useQuery()
  const [alerts, setAlerts] = useState<IAlert[]>([])
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAlerts((prev) =>
        prev.filter((alert) => new Date().getTime() - alert.createdAt.getTime() < 3000)
      )
    }, 3000)
    return () => clearInterval(intervalId)
  }, [])
  return (
    <AppReactContext.Provider
      value={{ me: data?.me || null, alerts: alerts, setAlerts: setAlerts }}
    >
      {isLoading || isFetching ? (
        <Loader />
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <div style={contextWrapper}>
          {children}
          <div style={alertContainer}>
            {alerts.map((alert, index) => (
              <GlobalAlert key={index} title={alert.title} type={alert.type} />
            ))}
          </div>
        </div>
      )}
    </AppReactContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppReactContext)
}

export const useMe = () => {
  const { me } = useAppContext()
  return me
}

export const useAlerts = () => {
  const { setAlerts } = useAppContext()
  return setAlerts
}

const alertContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '280px',
  maxWidth: '20vw',
  position: 'fixed',
  bottom: '1rem',
  right: '1rem',
  zIndex: 1000,
}

const contextWrapper: React.CSSProperties = {
  position: 'relative',
}
