let done = false;
let playerName;

let players = [];
while (!done)
{
  playerName = window.prompt(`Enter player ${players.length + 1}'s name, or press Enter to quit:`);
  if (playerName != "")
  {
    players.push(playerName);
  }
  else
  {
    done = true;
  }
}

let idName = "";
let rolls = [];
let scores = [];
for (let i = 0; i < players.length; i++)
{
  idName = "player-" + String(i + 1);
  rolls.push([null, null, null, null, null, null, null, null, null, null, null, null, null]);
  document.querySelector("#" + idName + " td").innerHTML = players[i];
}

let r = 0;
let c = 0;

document.getElementById("player-1").classList.add("yourTurn");
document.querySelector("#player-1 + tr").classList.add("yourTurn");

function bowl(pins)
{
  rolls[r][c] = pins;
  let rowId;
  if (c == 10)
  {
    c++;
  }
  else if (c == 11)
  {
    if (rolls[r][10] == 6 || (rolls[r][10] + rolls[r][11] == 6))
    {
      c++;
    }
    else
    {
      c--;
      rowId = "player-" + (r + 1);
      document.getElementById(rowId).classList.remove("yourTurn");
      document.querySelector("#" + rowId + " + tr").classList.remove("yourTurn");
      r++;
      rowId = "player-" + (r + 1);
      document.getElementById(rowId).classList.add("yourTurn");
      document.querySelector("#" + rowId + " + tr").classList.add("yourTurn");
    }
  }
  else if (c == 12)
  {
    c -= 2;
    rowId = "player-" + (r + 1);
    document.getElementById(rowId).classList.remove("yourTurn");
    document.querySelector("#" + rowId + " + tr").classList.remove("yourTurn");
    r++;
    rowId = "player-" + (r + 1);
    document.getElementById(rowId).classList.add("yourTurn");
    document.querySelector("#" + rowId + " + tr").classList.add("yourTurn");
  }
  else if (c % 2 == 0)
  {
    if (pins == 6)
    {
      rowId = "player-" + (r + 1);
      document.getElementById(rowId).classList.remove("yourTurn");
      document.querySelector("#" + rowId + " + tr").classList.remove("yourTurn");
      r++;
      rowId = "player-" + (r + 1);
      document.getElementById(rowId).classList.add("yourTurn");
      document.querySelector("#" + rowId + " + tr").classList.add("yourTurn");
    }
    else
    {
      c++;
    }
  }
  else
  {
    c--;
    rowId = "player-" + (r + 1);
    document.getElementById(rowId).classList.remove("yourTurn");
    document.querySelector("#" + rowId + " + tr").classList.remove("yourTurn");
    r++;
    rowId = "player-" + (r + 1);
    document.getElementById(rowId).classList.add("yourTurn");
    document.querySelector("#" + rowId + " + tr").classList.add("yourTurn");
  }
  if (r == players.length)
  {
    rowId = "player-" + (r + 1);
    document.getElementById(rowId).classList.remove("yourTurn");
    document.querySelector("#" + rowId + " + tr").classList.remove("yourTurn");
    r = 0;
    rowId = "player-" + (r + 1);
    document.getElementById(rowId).classList.add("yourTurn");
    document.querySelector("#" + rowId + " + tr").classList.add("yourTurn");
    c += 2;
  }  
  updateScoreboard();
}

function updateScoreboard()
{
  let score = 0;
  for (let i = 0; i < players.length; i++)
  {
    let rowId = "player-" + (i + 1);
    for (let j = 0; j < 6; j++)
    {
      let selector = "#" + rowId + " + tr td:nth-of-type(" + (j < 5 ? (j + 1) * 2 : 13) + ")";
      document.querySelector(selector).innerHTML = calculateScore(i, j);
    }
    for (let j = 0; j < 13; j++)
    {
      let selector = "#" + rowId + " td:nth-of-type(" + (j + 2) + ")";
      if (j == 10)
      {
        if (rolls[i][j] == 6)
        {
          document.querySelector(selector).innerHTML = "X";
        }
        else if (rolls[i][j] == 0)
        {
          document.querySelector(selector).innerHTML = "-";
        }
        else
        {
          document.querySelector(selector).innerHTML = rolls[i][j];
        }
      }
      else if (j == 11)
      {
        if (rolls[i][j] + rolls[i][j - 1] == 6 && rolls[i][j - 1] != 6)
        {
          document.querySelector(selector).innerHTML = "/";
        }
        else if (rolls[i][j] == 6)
        {
          document.querySelector(selector).innerHTML = "X";
        }
        else if (rolls[i][j] == 0)
        {
          document.querySelector(selector).innerHTML = "-";
        }
        else
        {
          document.querySelector(selector).innerHTML = rolls[i][j];
        }
      }
      else if (j == 12)
      {
        if (rolls[i][j] + rolls[i][j - 1] == 6 && rolls[i][j - 1] != 6 && (rolls[i][j - 2] + rolls[i][j - 1] != 6))
        {
          document.querySelector(selector).innerHTML = "/";
        }
        else if (rolls[i][j] == 6)
        {
          document.querySelector(selector).innerHTML = "X";
        }
        else if (rolls[i][j] == 0)
        {
          document.querySelector(selector).innerHTML = "-";
        }
        else
        {
          document.querySelector(selector).innerHTML = rolls[i][j];
        }
      }
      else if (j % 2 != 0 && rolls[i][j - 1] == 6)
      {
        document.querySelector(selector).innerHTML = "X";
      }
      else if (j % 2 != 0 && rolls[i][j] + rolls[i][j - 1] == 6 && rolls[i][j - 1] != 6)
      {
        document.querySelector(selector).innerHTML = "/";
      }
      else if (rolls[i][j] == 0)
      {
        document.querySelector(selector).innerHTML = "-";
      }
      else if (rolls[i][j] != 6)
      {
        document.querySelector(selector).innerHTML = rolls[i][j];
      }
    }
  }
}

function calculateScore(player, frame)
{
  if (rolls[player][frame * 2] === null)
  {
    return (null);
  }
  let score = 0;
  console.log("Player: " + players[player] + "\tFrame: " + (frame + 1));
  for (let j = 0; j < (frame + 1) * 2; j++)
  {
    if (j == 11)
    {
      if (rolls[player][j] + rolls[player][j - 1] == 6 && rolls[player][j - 1] != 6)
      {
        score += rolls[player][j];
        console.log(j + " spare, Score: " + score);
        score += rolls[player][j + 1];
        console.log(j + " spare bonus, Score: " + score);
      }
      else if (rolls[player][j - 1] != 6)
      {
        score += rolls[player][j];
        console.log(j + " normal, Score: " + score);
      }
      else
      {
        console.log(j + " doesn't score, Score: " + score);
      }
    }
    else if (j == 12)
    {
      console.log(j + " doesn't score, Score: " + score);
    }
    else if (j % 2 == 0 && rolls[player][j] == 6)
    {
      score += rolls[player][j];
      console.log(j + " strike, Score: " + score);
      let added = 0;
      let k = 1;
      while (added < 2 && j + k < 13)
      {
        if (!(rolls[player][j + k] === null))
        {
          score += rolls[player][j + k];
          added++;
          console.log(j + " strike bonus " + added + ", Score: " + score);
        }
        k++;
      }
    }
    else if (j % 2 != 0 && rolls[player][j] + rolls[player][j - 1] == 6 && rolls[player][j - 1] != 6)
    {
      score += rolls[player][j];
      console.log(j + " spare, Score: " + score);
      score += rolls[player][j + 1];
      console.log(j + " spare bonus, Score: " + score);
    }
    else
    {
      score += rolls[player][j];
      console.log(j + " normal, Score: " + score);
    }
  }
  console.log("\n");
  return (score);
}