import { Route, Routes } from 'react-router'

import { Layout } from './components/Layout'
import { TrpcProvider } from './lib/trpc'
import { Main } from './pages/Main'

export default function App() {
  return (
    <TrpcProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </TrpcProvider>
  )
}
