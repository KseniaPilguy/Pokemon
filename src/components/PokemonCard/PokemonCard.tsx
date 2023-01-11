import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';

import { PokemonResponseI } from 'pages/HomePage/HomePage';
import { getPokemonNumber } from 'utils/getPokemonNumber';

export interface PokemonTypeI {
  type: {
    name: string
  }
}

interface PokemonI {
  sprites: {
    front_default: string
  },
  types: PokemonTypeI[]
}

const getPokemonCardColor = (type?: string) => {
  switch (type) {
    case 'grass':
      return '#2ad4ab'; 
    case 'fire':
      return '#ef7267'; 
    case 'water':
      return '#55a4ee'; 
    case 'bug':
      return '#673ab7'; 
    case 'electric':
      return '#f5c747';
    default:
      return '#607d8b';
  }
}

const PokemonCard = (pokemon: PokemonResponseI) => {
  const navigate = useNavigate();
  const [item, setItem] = useState<PokemonI>({} as PokemonI);
  const [isLoading, setIsLoading] = useState(false);

  const pokemonNumber = pokemon?.url.slice(pokemon?.url.indexOf('pokemon') + 'pokemon'.length + 1, -1);
  const displayedPokemonNumber = getPokemonNumber(pokemonNumber);

  useEffect(() => {
    setIsLoading(true);
    
    (async () => {
      await fetch(pokemon.url)
      .then(async (response) => {
        const data = await response.json();
        setItem(data);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      })
  })()
  }, []);

  const handleOpenDetailedInformation = () => {
    navigate(`/pokemon`, {
      state: {pokemonUrl: pokemon.url}
    });
  }
  
  if (isLoading) return <CircularProgress />;

  return (
    <div 
      className='pokemon_card_wrapper' 
      style={{backgroundColor: getPokemonCardColor(item?.types && item?.types[0]?.type.name)}}
      onClick={handleOpenDetailedInformation}
    >
      <h3 className='pokemon_title'>{pokemon.name}</h3>
      <p className='pokemon_number'>{displayedPokemonNumber}</p>
      {item?.types && item?.types.map((type: PokemonTypeI, ind: number) => (
        <div className='pokemon_skill' key={ind}>{type.type.name}</div>
      ))}
       {item?.sprites?.front_default && (
         <div className='pokemon_image_wrapper'>
          <img
            src={item.sprites.front_default}
            className='pokemon_image'
            alt="Pokemon"
          />
         </div>
      )}
      <div className='symbol_wrapper'>
        <img
          src={require('../../shared/assets/pokemon-go.png')}
          alt="Pokemon Go"
        />
      </div>
    </div>
  );
}

export default PokemonCard;
