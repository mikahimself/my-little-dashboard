import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BusTimes } from './BusTimes';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <header className="App-header">
        <BusTimes></BusTimes>
      </header>
    </div>
    </QueryClientProvider>
  );
}

export default App;
