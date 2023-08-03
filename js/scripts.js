// list of pokemons loaded from an API
let pokemonRepository = (function () {
		
		let pokemonList = [];
		
		let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

		function getAll () {
			return pokemonList;
		}
		function add(pokemon) {
			pokemonList.push(pokemon);
		}

		function addListItem(pokemon) {
			let pokemonList = document.querySelector('.pokemon-list');
			let listItem = document.createElement('li');
			let button = document.createElement('button');
			
			button.innerText = pokemon.name;
			button.classList.add('pokemon-button');
			button.addEventListener('click', function(event) {
				showDetails(pokemon);
			})
			
			listItem.appendChild(button);
			pokemonList.appendChild(listItem);
		}

		function loadList() {
			return fetch(apiUrl).then(function (response) {
				return response.json();
			}).then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url
					};
					add(pokemon);
				});
			}).catch(function (e) {
				console.error(e);
			})
		}

		function loadDetails(item) {
			let url = item.detailsUrl;
			return fetch(url).then(function (response) {
				return response.json();
			}).then(function (details) {
				item.imageUrl = details.sprites.front_default;
				item.height = details.height;
				item.types = details.types.map((type) => type.type.name);
			}).catch(function (e) {
				console.error(e);
			});
		}

		function showDetails(pokemon) {
			loadDetails(pokemon).then(function () {
				
				//fetch html container
				let modalContainer = document.querySelector('#modal-container');
				modalContainer.innerHTML = '';
				
				//create the modal element
				let modal = document.createElement('div');
				modal.classList.add('modal');

				// create a close button
				let closeButtonElement = document.createElement('button');
				closeButtonElement.classList.add('modal-close');
				closeButtonElement.innerText = 'Close';
				closeButtonElement.addEventListener('click', hideDetails);

				// create a title with the pokemon name
				let titleElement = document.createElement('h1');
				titleElement.innerText = pokemon.name;

				// create content with the pokemon height
				let heightElement = document.createElement('p');
				heightElement.innerText = 'Height:  ' + pokemon.height;

				// create content with the pokemon types
				let typesElement = document.createElement('p');
				typesElement.innerText = 'Type: ' + pokemon.types.join(', ');

				// create image element
				let imageElement = document.createElement('img');
        imageElement.classList.add('modal-img');
        imageElement.src = pokemon.imageUrl;

				modal.appendChild(closeButtonElement);
				modal.appendChild(titleElement);
				modal.appendChild(heightElement);
				modal.appendChild(typesElement);
				modal.appendChild(imageElement);

				modalContainer.appendChild(modal);
				modalContainer.classList.add('is-visible');
				modalContainer.addEventListener('click', (e) => {
					let target = e.target;
					if (target === modalContainer) {
						hideDetails();
					}
				})
			})
		}

		function hideDetails() {
			let modalContainer = document.querySelector('#modal-container');
			modalContainer.classList.remove('is-visible');
		}

		window.addEventListener('keydown', (e) => {
			let modalContainer = document.querySelector('#modal-container');
			if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
				hideDetails();
			}
		})

		return {
			add: add,
			getAll: getAll,
			addListItem: addListItem,
			loadList: loadList,
			loadDetails: loadDetails,
			showDetails: showDetails,
			hideDetails: hideDetails
		};
	}) ();

pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
