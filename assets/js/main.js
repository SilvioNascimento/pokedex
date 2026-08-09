const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

/*
O Fetch fornece uma definição genérica de objetos de Request e Response (e outras coisas envolvidas com solicitações de rede). Isso permitirá que eles sejam usados onde quer que sejam necessários no futuro, seja para service workers, Cache API e outras coisas similares que manipulam ou modifiquem pedidos e respostas ou qualquer tipo de caso de uso que possa exigir que você gere suas próprias responses programaticamente.
*/
fetch(url)
  .then((response) => response.json())        // Retorna a resposta da API em formato JSON
  .then((jsonBody) => jsonBody.results)       // Retorna apenas os resultados dos dados encontrados no JSON
  .then((pokemons) => {                       // Exibe os passos de como exibiu as informações dos    pokemons no log
    debugger
    console.log(pokemons)
  })  
  .catch((error) => console.log(error))
  .finally(() => console.log('Requisição concluída'));

