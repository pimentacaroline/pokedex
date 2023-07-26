// list of pokemons
let pokemonList = [
	{
		name: 'Pikachu', 
		height: 5, 
		type: ['water', 'grass']
	},
	{
		name: 'Snorlax', 
		height: 7, 
		type: ['fire', 'mountain']
	},
	{
		name: 'Charizard', 
		height: 9, 
		type: ['air', 'poison']
	}
];

// forEach() function to iterarte over the pokemon list
pokemonList.forEach(function(pokemon) {
	if (pokemon.height > 7){
		document.write(pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\’s big!' + '<br>');
	} else {
		document.write(pokemon.name + ' (height: ' + pokemon.height + ')' + '<br>');
	}
});