import { useEffect, useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { ThemeContext, ThemeProvider } from "./context/ThemeContext"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header/Header"
import { Home } from "./pages/Home"
import { Stake } from "./pages/Stake"
import { Farm } from "./pages/Farm"
import { Create, Launchpad, View } from "./pages/Launchpad"
import "./App.scss"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const { dark } = useContext(ThemeContext)
  useEffect(() => {
    if (dark === "theme-dark") {
      document.documentElement.className = "theme-dark"
    } else document.documentElement.className = "theme-light"
  }, [dark])
  return (
    <>
      <ThemeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/farm" element={<Farm />} />
          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/launchpad/create" element={<Create />} />
          <Route path="/launchpad/view/:viewId" element={<View />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
