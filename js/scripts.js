// list of pokemons loaded from an API
let pokemonRepository = (function () {
		
		let pokemonList = [];
		
		let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

		function add(pokemon) {
			pokemonList.push(pokemon);
		}

		function getAll () {
			return pokemonList;
		}

		function addListItem(pokemon) {
			let pokemonList = document.querySelector('.pokemon-list');
			let listItem = document.createElement('li');
			let button = document.createElement('button');
			
			listItem.classList.add('list-group-item', 'col-sm-4', 'col-lg-2');
			button.innerText = pokemon.name;
			button.classList.add('btn', 'btn-primary');
			button.setAttribute('data-toggle', 'modal');
			button.setAttribute('data-target', '#exampleModal');
			button.addEventListener('click', function(event) {
				showDetails(pokemon);
			})

			listItem.appendChild(button);
			pokemonList.appendChild(listItem);
		}

		function showDetails(pokemon) {
			pokemonRepository.loadDetails(pokemon).then(function () {
				console.log(pokemon);
				showModal(pokemon);
			});
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
				item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
				item.height = details.height;
				item.weight = details.weight;
				item.types = details.types.map((type) => type.type.name);
				item.abilities = details.abilities.map((ability) => ability.ability.name);
			}).catch(function (e) {
				console.error(e);
			});
		}

		//show the modal content
		function showModal(item) {
			let modalBody = $(".modal-body");
			let modalTitle = $(".modal-title");
			let modalHeader = $(".modal-header");
			let modalFooter = $ (".modal-footer");
			modalTitle.empty();
			modalBody.empty();
	
			let nameElement = $("<h1>" + item.name + "</h1>");
			nameElement.addClass("capitalize-first-letter");
			let imageElementFront = $('<img class="modal-img" style="width:50%">');
			imageElementFront.attr("src", item.imageUrlFront);
			let imageElementBack = $('<img class="modal-img" style="width:50%">');
			imageElementBack.attr("src", item.imageUrlBack);
			let heightElement = $("<p>" + "Height : " + item.height + "</p>");
			let weightElement = $("<p>" + "Weight : " + item.weight + "</p>");
			let typesElement = $("<p>" + "Types : " + item.types.join(', ') + "</p>");
			let abilitiesElement = $("<p>" + "Abilities : " + item.abilities.join(', ') + "</p>");
	

			modalTitle.append(nameElement);
			modalBody.append(imageElementFront);
			modalBody.append(imageElementBack);
			modalBody.append(heightElement);
			modalBody.append(weightElement);
			modalBody.append(typesElement);
			modalBody.append(abilitiesElement);
		}

		return {
			add: add,
			getAll: getAll,
			addListItem: addListItem,
			loadList: loadList,
			loadDetails: loadDetails,
			showDetails: showDetails,
		};
	}) ();

pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
