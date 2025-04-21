import { Route, Routes } from 'react-router'

import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import {
  getNewTaskRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
  getTasksRoute,
} from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { NewTask } from './pages/NewTask'
import { NotFound } from './pages/NotFound'
import { SignIn } from './pages/SignIn'
import { SignOut } from './pages/SignOut'
import { SignUp } from './pages/SignUp'
import { Tasks } from './pages/Tasks'

export default function App() {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getTasksRoute()} element={<Tasks />} />
            <Route path={getNewTaskRoute()} element={<NewTask />} />
            <Route path={getSignUpRoute()} element={<SignUp />} />
            <Route path={getSignInRoute()} element={<SignIn />} />
            <Route path={getSignOutRoute()} element={<SignOut />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AppContextProvider>
    </TrpcProvider>
  )
}
