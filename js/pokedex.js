/*################
Proyecto PokeDex Javier Cavanilles
Llamamos a la Pokedex consiguiendo un numero definido de Pokemon (en principio 15 pero podria variar). 
El Html pintara primero los pokemon definidos y luego habra un boton para ir cargando mas. 
Los pokemon llegan desordenados por lo que hacemos un promise all
Si pulsamos el boton de mas carga 15 mas teniendo en cuenta no repetir los pokemons. 
*/

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


function getPokemon(numero,offset){
numero=numero+totalPokemoncargados;
if (totalPokemoncargados!=0){
    offset=offset+1;
}
console.log(numero)
const allpokemons=[];
for (let i=offset;i<=numero; i++){
    allpokemons.push("https://pokeapi.co/api/v2/pokemon/"+i)
}
const allPoleFectch=allpokemons.map(pokemonURL => fetch(pokemonURL)
.then((response)=> response.json()))

Promise.all(allPoleFectch).then((element)=>{
    for (elem of element){
        pintaPokemon(elem.name,elem.sprites.front_default)
    }
    totalPokemoncargados=totalPokemoncargados+numero+1;

})
}




document.querySelector("button").addEventListener("click",(evento)=>{
    getPokemon(15,totalPokemoncargados)
});

getPokemon(15,1)