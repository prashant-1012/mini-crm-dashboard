import { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import { useAppSelector } from './hooks/reduxHooks';

function App() {
  const themeMode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = document.documentElement; // this is the <html> element
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]); // re-runs every time themeMode changes in Redux

  return <AppRouter />;
}

export default App;