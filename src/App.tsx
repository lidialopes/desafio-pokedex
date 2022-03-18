import { useMemo, useState } from 'react';
import 'antd/dist/antd.css';

import Pokemon from './model/Pokemon';
import AppRoutes from './routes/index';
import PokedexContext, { PokedexContextType } from './contexts/PokedexContext';

function App() {  
  const setPokedex = (pokemonList: Pokemon[]) => {
    setContext(old => { return {...old, pokedex: [...pokemonList] } });
  };
  const [context, setContext] = useState<PokedexContextType>({pokedex: [], setPokedex: setPokedex});
  
  return (
    <PokedexContext.Provider value={context}>
      <AppRoutes />
    </PokedexContext.Provider>
  );
}

export default App;
