import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CircularProgress from '@mui/material/CircularProgress';

import { PokemonTypeI } from 'components/PokemonCard/PokemonCard';
import { getPokemonNumber } from 'utils/getPokemonNumber';

interface PokemonAbilityI {
  ability: {
    name: string
  }
}

interface StatsDataI {
  base_stat: number,
  stat: {
    name: string
  }
}

interface PokemonDataI {
  species: {
    name: string,
    url: string
  },
  sprites: {
    back_default: string,
    front_default: string,
  },
  stats: StatsDataI[],
  types: PokemonTypeI[],
  abilities: PokemonAbilityI[],
  weight: number
}

const getPokemonCardColor = (type?: string) => {
  switch (type) {
    case 'grass':
      return 'rgba(42, 212, 171, 0.5)';
    case 'fire':
      return 'rgba(239, 114, 103, 0.5)';
    case 'water':
      return 'rgba(85, 164, 283, 0.5)';
    case 'bug':
      return 'rgba(103, 58, 183, 0.5)';
    case 'electric':
      return 'rgba(245, 199, 71, 0.5)';
    default:
      return 'rgba(96, 125, 139, 0.5)';
  }
}

const PokemonDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState<PokemonDataI>();

  const pokemonNumber = pokemonData?.species.url.slice(pokemonData?.species.url.indexOf('pokemon-species') + 'pokemon-species'.length + 1, -1);
  const displayedPokemonNumber = getPokemonNumber(pokemonNumber);

  useEffect(() => {
    (async () => {
      const response = await fetch(state.pokemonUrl);
      const data = await response.json();
    
      setPokemonData(data);
    })()
  }, [state.pokemonUrl]);

  const handlePreviousPokemon = () => {
    if (!pokemonNumber) return;
    navigate(`/pokemon`, {
      state: {pokemonUrl: `${state.pokemonUrl.slice(0, state.pokemonUrl.indexOf('pokemon') + 'pokemon'.length + 1)}${+pokemonNumber - 1}/`}
    });
  }

  const handleNextPokemon = () => {
    if (!pokemonNumber) return;
    navigate(`/pokemon`, {
      state: {pokemonUrl: `${state.pokemonUrl.slice(0, state.pokemonUrl.indexOf('pokemon') + 'pokemon'.length + 1)}${+pokemonNumber + 1}/`}
    });
  }

  if (!pokemonData) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  )

  return (
    <div className='detailed_page_wrapper'>
      <div className='detailed_page_container'>
        <div className='top_page_container'>
          {pokemonNumber && pokemonNumber !== '1' && (
            <div className='switch_button' onClick={handlePreviousPokemon}>
              <ArrowCircleLeftIcon fontSize='large' className='icon'/>
              <p className='text'>{getPokemonNumber(`${+pokemonNumber - 1}`)}</p>
            </div>
          )}
          <h2 className='title'>{pokemonData.species.name}
            <span className='number'>{displayedPokemonNumber}</span>
          </h2>
          {pokemonNumber && pokemonNumber !== '100' && (
            <div className='switch_button' onClick={handleNextPokemon}>
              <p className='text'>{getPokemonNumber(`${+pokemonNumber + 1}`)}</p>
              <ArrowCircleRightIcon className='icon' fontSize='large' />
            </div>
          )}
        </div>
        <div className='main_content'>
          <div className='side'>
            <div className='pokemon_image_wrapper'>
              <img
                src={pokemonData.sprites.front_default}
                className='pokemon_image'
                alt="Pokemon Front"
              />
            </div>
            <div className='pokemon_image_wrapper'>
              <img
                src={pokemonData.sprites.back_default}
                className='pokemon_image'
                alt="Pokemon Back"
              />
          </div>
          </div>
          <div className='side'>
            <div className='information_block'>
              {pokemonData.types && (
                <>
                  <h4 className='subtitle'>Type</h4>
                  <div className='flex'>
                    {pokemonData.types.map((type: PokemonTypeI, ind: number) => (
                      <div className='pokemon_skill' key={ind} style={{backgroundColor: getPokemonCardColor(type.type.name)}}>{type.type.name}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className='information_block'>
              {pokemonData.abilities && (
                <>
                  <h4 className='subtitle'>Abilities</h4>
                  <div className='flex'>
                    {pokemonData.abilities.map((ability: PokemonAbilityI, ind: number) => (
                      <div className='pokemon_skill' key={ind} style={{backgroundColor: 'rgba(96, 125, 139, 0.5)'}}>{ability.ability.name}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className='information_block'>
              <h4 className='subtitle'>Weight: {pokemonData.weight}</h4>
            </div>
            <div className='information_block'>
              {pokemonData.stats && (
                <>
                  <h4 className='subtitle'>Stats</h4>
                  <div className='flex'>
                    {pokemonData.stats.map((stat: StatsDataI, ind: number) => (
                      <div className='pokemon_skill' key={ind} style={{backgroundColor: 'rgba(96, 125, 139, 0.5)'}}>{stat.stat.name}: {stat.base_stat}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailPage;
