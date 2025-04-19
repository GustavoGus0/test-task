import { Route, Routes } from 'react-router'

import { Layout } from './components/Layout'
import { getNewTaskRoute, getTasksRoute } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { NewTask } from './pages/NewTask'
import { Tasks } from './pages/Tasks'

export default function App() {
  return (
    <TrpcProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path={getTasksRoute()} element={<Tasks />} />
          <Route path={getNewTaskRoute()} element={<NewTask />} />
        </Route>
      </Routes>
    </TrpcProvider>
  )
}
