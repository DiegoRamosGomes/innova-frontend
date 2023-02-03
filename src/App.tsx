import { PeopleList } from "./components/PeopleList";
import './App.css'
import { PeopleProvider } from "./contexts/PeopleContext";

function App() {
  return (
    <div className="App">
      <PeopleProvider>
        <PeopleList/>
      </PeopleProvider>
    </div>
  )
}

export default App
