const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
let totalPokemoncargados=0;

function pintaPokemon(name,image){
    //Creacion LI
    let newli = document.createElement('li');
    //Div Card
    let newdivcard = document.createElement('div');
    newdivcard.classList = 'card';
    //Div titulo
    let newdivtitle = document.createElement('div');
    newdivtitle.classList = 'card-title';
    newdivtitle.textContent=name;
    //Div y img Imagen
    let newdivimage = document.createElement('div');
    newdivimage.classList = 'card-image';
    let myimagen=new Image(180,180);
    myimagen.src=image;
    newdivimage.appendChild(myimagen)
    //Div Estadisticas
    let newdivstats = document.createElement('div');
    newdivstats.classList = 'card-stats';
    let newulstats = document.createElement('ul');



    //añado al html
    document.getElementById('pokedex').appendChild(newli)
    newli.insertBefore(newdivcard, newli.lastChild)
    newdivcard.insertBefore(newdivtitle, newdivcard.lastChild)
    newdivcard.insertBefore(newdivimage, newdivcard.lastChild.nextSibling)
    newdivcard.insertBefore(newdivstats, newdivcard.lastChild.nextSibling)

}


function getPokemon(pokemonurl){
    fetch(pokemonurl)
        .then((response)=>{return response.json();})
        .then((elem)=>{
            console.log(elem)
            pintaPokemon(elem.name,elem.sprites.front_default)
        })

}



function getAllPokemons(numero,offset){

    fetch(baseUrl+'?limit='+numero+'&offset='+offset)
        .then((response) => { return response.json(); })
        .then((datajson)=>{
            for (elem of datajson.results){
                getPokemon(elem.url)
            }
            totalPokemoncargados=totalPokemoncargados+numero;
            console.log(totalPokemoncargados)
        })

}


document.querySelector("button").addEventListener("click",(evento)=>{
    getAllPokemons(15,totalPokemoncargados)
});

getAllPokemons(15)