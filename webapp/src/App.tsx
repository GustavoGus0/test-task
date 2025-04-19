import { TrpcProvider } from './lib/trpc'
import { Main } from './pages/Main'

export default function App() {
  return (
    <TrpcProvider>
      <Main />
    </TrpcProvider>
  )
}
