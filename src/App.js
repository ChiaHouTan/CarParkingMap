import Home from "./pages/Home"
import Map from "./pages/Map"
import Table from "./pages/Table"


function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    case "/map":
      component = <Map />
      break
    case "/table":
      component = <Table />
      break
  }

  return (
    <>
    {component}
    </>
  
  )
}

export default App;
