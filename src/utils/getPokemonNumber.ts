export const getPokemonNumber = (pokemonNumber?: string) => {
  return pokemonNumber ? `#${pokemonNumber.length === 1 ? `00${pokemonNumber}` : 
    pokemonNumber.length === 2 ? `0${pokemonNumber}` : pokemonNumber}` : '#000';
} 
