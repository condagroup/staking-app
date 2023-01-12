import { useEffect, useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { ThemeContext, ThemeProvider } from "./context/ThemeContext"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header/Header"
import { Home } from "./pages/Home"
import { Stake } from "./pages/Stake"
import { Farm } from "./pages/Farm"
import { Create, Launchpad, Manage, View } from "./pages/Launchpad"
import "./App.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import { useAccount } from 'wagmi';

function App() {
  const { dark } = useContext(ThemeContext)
  useEffect(() => {
    if (dark === "theme-dark") {
      document.documentElement.className = "theme-dark"
    } else document.documentElement.className = "theme-light"
  }, [dark])
  const { isConnected, address } = useAccount()
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
          <Route path="/launchpad/manage" element={(isConnected && address === "0x8F3a535e29C39F88c66B8317062cE33315f2253E") && <Manage />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
