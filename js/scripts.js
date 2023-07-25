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

//write the pokemon name and height in the DOM and highlight one

for (i=0; i < pokemonList.length; i++) {
	if (pokemonList[i].height > 7){
		document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\’s big!' + '<br>');
	} else {
		document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '<br>');
	}
}


