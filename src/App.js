import StoreSignIn from "Components/AdminLogin/StoreSignIn"
import Layout from "Layout"
import { routes } from "Routes"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StoreSignIn />} />
        {routes.map((route) => {
          return (
            <Route
              key={route.id}
              path={route.path}
              element={
                <Layout id={route.id} navLink={route.path} navItem={route.navItem} component={route.component} />
              }
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
