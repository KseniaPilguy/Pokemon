import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import PokemonCard from 'components/PokemonCard/PokemonCard';

export interface PokemonResponseI {
  name: string;
  url: string;
}

const LOAD_POKEMONS_LIMIT = 24;

const HomePage = () => {
  const [pokemons, setPokemons] = useState<PokemonResponseI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(LOAD_POKEMONS_LIMIT);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
        .then(async (response) => {
          const data = await response.json();
          setPokemons(data.results);
          setIsLoading(false);
          setLimit(prev => prev + LOAD_POKEMONS_LIMIT);
        })
        .finally(() => {
          setIsLoading(false);
        })
    })()
  }, []);

  const handleLoadMorePokemons = async () => {
    await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then(async (response) => {
        const data = await response.json();
        setPokemons(data.results);
        setLimit(prev => prev + LOAD_POKEMONS_LIMIT);
      })
  }

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  )

  return (
    <Container fixed>
      {pokemons && pokemons.length && !isLoading ? (
        <InfiniteScroll
          dataLength={pokemons.length}
          next={handleLoadMorePokemons}
          hasMore={true}
          style={{
            overflow: 'scroll'
          }}
          loader={<h4
          style={{
            color: 'white',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}>Loading...</h4>}
        >
          <div className='pokemons_container'>
            {pokemons.map((pokemon: PokemonResponseI, index: number) => (
              <Grid item xs={1} sm={4} md={3} key={index} className='pokemon_item'>
                <PokemonCard {...pokemon} />
              </Grid>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
      <Typography variant="h5" component="h5" style={{
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center'
      }}>
        No available pokemons
      </Typography>
      )}
    </Container>
  );
}



export default HomePage;