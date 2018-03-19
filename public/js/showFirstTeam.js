function showFirstTeam() {
  const playersList = document.getElementById('playersList');
  playersList.classList.add('firstTeamBG');
  console.log(playersList);
  firstTeam.map( player => {
    const li = document.createElement('li');
    li.classList.add('liPlayer');
    const playerData = [];
    Object.entries(player).forEach( key => {
      playerData.push(`<div class="pair"><span class="keyPlayer">${key[0]}:</span>${key[1]}</div>`);
    });
    li.innerHTML = playerData.join('');
    playersList.appendChild(li);
    });
}
