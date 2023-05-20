import { useEffect, useState, createContext } from 'react'
import BarLoader from "react-spinners/ClipLoader";
import './App.css'
import ThreePointVis from './ThreePointViz';
import Footer from './Footer';

function App() {

  const [data, setData] = useState([[]])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [settings, setSettings] = useState({showDocuments:true, showMetadata: true, showLines: true})
  
  

  useEffect(() => {
    setLoading(true)
    setData({})
    fetch(`http://127.0.0.1:5000/data`)
      .then(res => res.json())
      .then(
        (result) => {
          setLoading(false);
          setData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setLoading(false);
          setError(error);
        }
      )
  }, [])

  return (
    <>
    {loading &&
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
  }}>
      <BarLoader
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>
    }
    { !loading && <>
    <div className="vis-container">
        <ThreePointVis data={data} settings={[settings, setSettings]} />
      </div>
    
    <Footer settings={[settings, setSettings]}></Footer></>
    }
    </>
    
  )
}

export default App
