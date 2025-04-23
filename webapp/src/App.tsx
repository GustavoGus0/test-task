import { Route, Routes } from 'react-router'

import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import {
  getArchivedTasksRoute,
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
import { NewTask } from './pages/NewTask'
import { NotFound } from './pages/NotFound'
import { SignIn } from './pages/SignIn'
import { SignOut } from './pages/SignOut'
import { SignUp } from './pages/SignUp'
import { Tasks } from './pages/Tasks'
import { ViewTask } from './pages/ViewTask'

export default function App() {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getTasksRoute()} element={<Tasks />} />
            <Route path={getNewTaskRoute()} element={<NewTask />} />
            <Route path={getArchivedTasksRoute()} element={<ArchivedTasks />} />
            <Route path={getSignUpRoute()} element={<SignUp />} />
            <Route path={getSignInRoute()} element={<SignIn />} />
            <Route path={getSignOutRoute()} element={<SignOut />} />
            <Route path={getViewTaskRoute(viewTaskRouteParams)} element={<ViewTask />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AppContextProvider>
    </TrpcProvider>
  )
}
