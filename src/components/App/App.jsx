import './App.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'

export default function App() {
  return (
    <div className="app">
      <div className="app__content">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    </div>
  )
}
