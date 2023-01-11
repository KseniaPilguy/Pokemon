import { Routes, Route } from "react-router-dom";

import HomePage from "pages/HomePage/HomePage";
import PokemonDetailPage from "pages/PokemonDetailPage/PokemonDetailPage";
import Header from "components/Header/Header";

const App = () => {
  return (
    <div className="main_container">
      <div className='page_background' />
      <Header />
      <div className='pages_container'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon" element={<PokemonDetailPage />} />
        </Routes>
      </div>
      
    </div>
  )
}

export default App;
