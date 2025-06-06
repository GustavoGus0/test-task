import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { Route, Routes, useLocation } from 'react-router'

import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import {
  editTaskRouteParams,
  getArchivedTasksRoute,
  getEditTaskRoute,
  getExecutorsRoute,
  getNewTaskRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
  getTasksRoute,
  getViewTaskRoute,
  viewTaskRouteParams,
} from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { ArchivedTasks } from './pages/ArchivedTasks'
import { EditTask } from './pages/EditTask'
import { Executors } from './pages/Executors'
import { NewTask } from './pages/NewTask'
import { NotFound } from './pages/NotFound'
import { SignIn } from './pages/SignIn'
import { SignOut } from './pages/SignOut'
import { SignUp } from './pages/SignUp'
import { Tasks } from './pages/Tasks'
import { ViewTask } from './pages/ViewTask'

export default function App() {
  const location = useLocation()
  return (
    <HelmetProvider>
      <TrpcProvider>
        <AppContextProvider>
          <AnimatePresence mode="popLayout">
            <Routes location={location} key={location.pathname}>
              <Route element={<Layout />}>
                <Route path={getTasksRoute()} element={<Tasks />} />
                <Route path={getNewTaskRoute()} element={<NewTask />} />
                <Route path={getArchivedTasksRoute()} element={<ArchivedTasks />} />
                <Route path={getExecutorsRoute()} element={<Executors />} />
                <Route path={getSignUpRoute()} element={<SignUp />} />
                <Route path={getSignInRoute()} element={<SignIn />} />
                <Route path={getSignOutRoute()} element={<SignOut />} />
                <Route path={getViewTaskRoute(viewTaskRouteParams)} element={<ViewTask />} />
                <Route path={getEditTaskRoute(editTaskRouteParams)} element={<EditTask />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </AppContextProvider>
      </TrpcProvider>
    </HelmetProvider>
  )
}
