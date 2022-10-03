import DataEntry from './components/dataEntry/DataEntry'
import DataDisplay from './components/dataDisplay/DataDisplay'
import './App.css'
export default function App() {
  return (
    <div className='container-app'>
      <div className='App'>
        <div className='leftView'>
          <DataEntry />
        </div>
        <div className='rightView'>
          <DataDisplay />
        </div>
      </div>
    </div>
  )
}
