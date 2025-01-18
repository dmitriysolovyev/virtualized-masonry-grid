import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import { Pexels } from './external/pexels/pexels';
import { VirtualPhotoGrid } from './model/virtualPhotoGrid';
import MainRoutes from './pages/Routes'
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

const App = () => {  
  // ...   
  useEffect(() => {
    async function fetchData() {
      try {
        const { innerWidth, innerHeight } = window;
        console.log({
          innerWidth, innerHeight
        });
        const grid = new VirtualPhotoGrid(Pexels.instance, innerWidth, 5);
        grid.getVisible(0, innerHeight).then((items) => console.log(items));
      } catch (error) {
        console.error("There was a problem:", error);      
      } 
    }
    fetchData();
  }, []);

  return (
    <Suspense>
      <Router>
        <MainRoutes />
      </Router>
    </Suspense>
  )
};


export default App;
