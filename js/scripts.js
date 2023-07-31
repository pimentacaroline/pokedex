// list of pokemons

let pokemonRepository = (function () {
		
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

		function getAll () {
			return pokemonList;
		}
		function add(item) {
			pokemonList.push(item);
		}

		function addListItem(pokemon) {
			let pokemonList = document.querySelector('.pokemon-list');
			let listItem = document.createElement('li');
			let button = document.createElement('button');
			button.innerText = pokemon.name;
			button.classList.add('pokemon-button');
			listItem.appendChild(button);
			pokemonList.appendChild(listItem);
		}

		return {
			getAll: getAll,
			add: add,
			addListItem: addListItem
		}

}) ()

// forEach() function to iterarte over the pokemon list
pokemonRepository.getAll().forEach(function(pokemon) {
	pokemonRepository.addListItem(pokemon);
});
