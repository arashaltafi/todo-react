import { useSelector } from 'react-redux';
import MyRoute from './route/MyRoute';
import NotFound from './pages/NotFound';

function App() {
  const is404 = useSelector((state: any) => state.appSetting.is404);

  return (
    <div className='w-full h-full flex items-center justify-center flex-col select-none ios-padding'>
      {
        is404 ? <NotFound /> : <MyRoute />
      }
    </div>
  )
}

export default App
