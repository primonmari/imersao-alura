const searchInput = document.getElementById('search-input'); // Seleciona o input de pesquisa
const resultArtist = document.getElementById('result-artist'); // Manipula o resultado da pesquisa
const resultPlaylist = document.getElementById('result-playlists'); // Playlist ocultada ao pesquisar

function requestApi(searchTerm) { // Consumindo API
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`; // Busca apenas o item da pesquisa
    fetch(url)
        .then(response => response.json()) // Converte resposta para JSON
        .then(result => {
            console.log(result); // Agora o console.log funciona corretamente
            displayResults(result); // Passa o resultado como parâmetro
        })
        .catch(error => console.error('Erro na requisição:', error)); // Trata possíveis erros
}

function displayResults(result) {
    // Oculta a lista de playlists 
    resultPlaylist.classList.add("hidden");

    // Se o array 'result' estiver vazio (sem artistas), esconde a área de resultados de artistas
    if (result.length === 0) {
        resultArtist.classList.add('hidden');  // Adiciona a classe 'hidden' para ocultar o elemento
        return;  // Sai da função porque não há o que exibir
    }

    // obtem o valor da busca que o usuário digitou no campo de pesquisa
    const searchTerm = searchInput.value.toLowerCase();  // Converte o termo de pesquisa para minúsculas

    // Filtra a lista de artistas, mantendo apenas os que têm o nome correspondente ao termo de busca
    const filteredArtists = result.filter(artist => 
        artist.name.toLowerCase().includes(searchTerm)  // Compara se o nome do artista contém o termo de busca
    );

    // Se nenhum artista corresponder ao termo de busca, esconde a área de resultados
    if (filteredArtists.length === 0) {
        resultArtist.classList.add('hidden');  // Esconde a área de resultados
        return;  // Sai da função porque não há artistas correspondentes
    }

    // Se houver pelo menos um artista filtrado, pega o primeiro artista da lista filtrada
    const artist = filteredArtists[0];  // Pegamos apenas o primeiro artista encontrado

    // Aqui pegamos os elementos do HTML que correspondem ao cartão de artista
    const artistCard = document.getElementById('artist-card');  // Pega o cartão de artista (já presente no HTML)
    const artistImage = artistCard.querySelector('#artist-img');  // Pega a imagem do artista dentro do cartão
    const artistName = artistCard.querySelector('#artist-name');  // Pega o nome do artista dentro do cartão

    // Atualiza o cartão de artista com as informações do artista filtrado
    artistImage.src = artist.urlImg;  // Atualiza o 'src' da imagem com o link da imagem do artista
    artistImage.alt = artist.name;  // Atualiza o 'alt' da imagem com o nome do artista
    artistName.innerText = artist.name;  // Atualiza o texto do nome do artista

    // Finalmente, exibe o cartão de artista, removendo a classe 'hidden' que o oculta
    resultArtist.classList.remove('hidden');  // Exibe o cartão de resultados de artista
}




document.addEventListener('input', function () { // Escuta evento de input
    const searchTerm = searchInput.value.toLowerCase(); // Converte para minúsculas

    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden'); // Esconder playlists
        resultArtist.classList.add('hidden'); // Esconder artistas
        return; // Para execução
    }
    
    requestApi(searchTerm);
});
