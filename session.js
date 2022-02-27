const loadData = () =>{
    document.getElementById('main').innerHTML = '';
    // document.getElementById('spinner').style.display = 'block'
    const searchValue = document.getElementById('search-value').value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}
    `

    fetch(url)
    .then(res => res.json())
    .then(data =>{
        if(data.player== null){
            document.getElementById('spinner').style.display = 'block'
        }
        else{
            playerDetails(data.player);

            document.getElementById('spinner').style.display = 'none'
        }


    }) 
    
}


const playerDetails = (players) =>{
const mainDiv = document.getElementById('main')
for ( const player of players){
    console.log(player);
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
                    <img src="${player.strThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${player.strPlayer}</h5>
                      <p class="card-text">Country: ${player.strNationality}</p>
                      <p class="card-text">Id: ${player.idPlayer}</p>
                      <a href="#"  class="btn btn-danger">Details</a>
                      <a href="#" onclick="details(${player.idPlayer})" class="btn btn-success">Details</a>
                      
                      
                    </div>
                  </div>
    `
    mainDiv.appendChild(div) 
}


}


const details = (id) =>{
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data.players[0]))

}

const showDetails = (info) =>{

    if(info.strGender == 'Male'){
        document.getElementById('male').style.display = 'block';
        document.getElementById('female').style.display = 'none';
    }
    else{
        document.getElementById('male').style.display = 'none';
        document.getElementById('female').style.display = 'block';

    }

    const mainDiv = document.getElementById('mainDetails')
    document.getElementById('mainDetails').innerHTML = ''; 
    const div = document.createElement('div')
    div.innerHTML =
    `<h2>Name: ${info.strPlayer}</h2>
    <p>Player Id : ${info.idPlayer}</p>
    `

    
    mainDiv.appendChild(div)
}