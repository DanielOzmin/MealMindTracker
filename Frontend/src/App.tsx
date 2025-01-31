import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home/Home';
import './App.css'
import Meals from './Components/Meals/Meals';
import { NutrientsContext } from './Services/Nutrients';
import { Nutrients } from './Services/Nutrients';
import { useState } from 'react';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/meals",
    element: <Meals/>
  }
])

function App() {
  const [nutrients, setNutrients] = useState<Nutrients>(null)

  return (
    <NutrientsContext.Provider value={{nutrients,setNutrients}}>
    <RouterProvider router={router}/>
    </NutrientsContext.Provider>
  )
}

export default App
