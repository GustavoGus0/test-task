import type { TrpcRouterOutput } from '@management/backend/src/router'
import { AnimatePresence, motion } from 'framer-motion'
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
  windowWidth: number
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
  windowWidth: 0,
})

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading, isFetching, isError } = trpc.getMe.useQuery()
  const [alerts, setAlerts] = useState<IAlert[]>([])
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAlerts((prev) =>
        prev.filter((alert) => new Date().getTime() - alert.createdAt.getTime() < 1000)
      )
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])
  return (
    <AppReactContext.Provider
      value={{
        me: data?.me || null,
        alerts: alerts,
        setAlerts: setAlerts,
        windowWidth,
      }}
    >
      {isLoading || isFetching ? (
        <Loader />
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <motion.div style={contextWrapper}>
          {children}
          {windowWidth > 768 && (
            <motion.div style={alertContainer} layout="position">
              <AnimatePresence>
                {alerts.map((alert, index) => (
                  <GlobalAlert key={index} title={alert.title} type={alert.type} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
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

export const useWindowWidth = () => {
  const { windowWidth } = useAppContext()
  return windowWidth
}

const alertContainer: React.CSSProperties = {
  overflow: 'hidden',
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
