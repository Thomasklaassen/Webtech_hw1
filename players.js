class Team {
    #title; #country; #city;
    
    constructor(title, country, city) {
        this.title = title;
        this.country = country;
        this.city = city;
    }
    
    get title() { return this.#title; }
    get country() { return this.#country; }
    get city() { return this.#city; }

    set title(v) { if (v !== "") this.#title = v; }
    set country(v) { if (v !== "") this.#country = v; }
    set city(v) { if (v !== "") this.#city = v; }
}

class Person {
    #firstName; #lastName; #born; #nationality;
    
    constructor(firstName, lastName, born, nationality) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.born = born;
        this.nationality = nationality;
    }
    
    get firstName() { return this.#firstName; }
    get lastName() { return this.#lastName; }
    get born() { return this.#born; }
    get nationality() { return this.#nationality; }

    set firstName(v) { if (v !== "") this.#firstName = v; }
    set lastName(v) { if (v !== "") this.#lastName = v; }
    set nationality(v) { if (v !== "") this.#nationality = v; }
    set born(v) { 
        this.#born = new Date(v); 
    }
}
class Player extends Person {
    #role; #number; #photo; #formerTeams;
    
    constructor(firstName, lastName, born, nationality, role, number, photo, formerTeams) {
        super(firstName, lastName, born, nationality); 
        this.role = role;
        this.number = number;
        this.photo = photo;
        this.formerTeams = formerTeams;
    }
    
    get role() { return this.#role; }
    get number() { return this.#number; }
    get photo() { return this.#photo; }
    get formerTeams() { return this.#formerTeams; }

    set role(v) { if (v !== "") this.#role = v; }
    set photo(v) { if (v !== "") this.#photo = v; }
    set number(v) { 
        if (v > 0) this.#number = v; 
    }
    set formerTeams(teamsArray) {
        this.#formerTeams = [];
        for (let p = 0; p < teamsArray.length; p++) {
            let t = teamsArray[p];
            this.#formerTeams.push(new Team(t.title, t.country, t.city));
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let fileInput = document.getElementById('jsonFileInput');
    
    let tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#333333';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px 15px';
    tooltip.style.borderRadius = '8px';
    tooltip.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
    tooltip.style.display = 'none'; 
    tooltip.style.zIndex = '1000';
    tooltip.style.pointerEvents = 'none';
    document.body.appendChild(tooltip);

    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            let file = event.target.files[0];
            let reader = new FileReader();
            
            reader.onload = function(e) {
                let data = JSON.parse(e.target.result);
                maakSpelersAan(data, tooltip);
            };
            
            reader.readAsText(file);
        });
    }
});

function maakSpelersAan(dataArray, tooltip) {
    let container = document.getElementById('playersContainer');
    container.classList.remove('hidden');
    
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    let posities = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

    for (let p = 0; p < posities.length; p++) {
        let huidigePositie = posities[p];
        let spelersGevonden = false;
        
        let sectie = document.createElement('section');
        sectie.className = 'card';

        let titel = document.createElement('h2');
        titel.className = 'section-title';
        titel.textContent = huidigePositie + 's';
        sectie.appendChild(titel);

        let grid = document.createElement('div');
        grid.className = 'player-grid';
        sectie.appendChild(grid);

        for (let p = 0; p < dataArray.length; p++) {
            
            if (dataArray[p].role === huidigePositie) {
                spelersGevonden = true;
                let pData = dataArray[p];
                let speler = new Player(pData.firstName, pData.lastName, pData.born, pData.nationality, pData.role, pData.number, pData.photo, pData.formerTeams);

                let article = document.createElement('article');
                article.className = 'player-card';

                let img = document.createElement('img');
                img.className = 'player-card__image';
                img.src = speler.photo;
                img.alt = speler.firstName + ' ' + speler.lastName;
                article.appendChild(img);

                let infoDiv = document.createElement('div');
                infoDiv.className = 'player-card__info';
                article.appendChild(infoDiv);

                let naam = document.createElement('h2');
                naam.className = 'player-card__name';
                naam.textContent = speler.firstName + ' ' + speler.lastName;
                infoDiv.appendChild(naam);

                let positieText = document.createElement('p');
                positieText.className = 'player-card__position';
                positieText.textContent = speler.role + " | Number: " + speler.number;
                infoDiv.appendChild(positieText);

                let nat = document.createElement('p');
                nat.textContent = "Nationality: " + speler.nationality;
                nat.style.fontSize = "0.9rem";
                nat.style.color = "#666666";
                infoDiv.appendChild(nat);

                let teamsP = document.createElement('p');
                teamsP.textContent = "Former Teams: ";
                teamsP.style.fontSize = "0.9rem";
                teamsP.style.marginTop = "15px";
                
                for (let k = 0; k < speler.formerTeams.length; k++) {
                    let team = speler.formerTeams[k];
                    
                    let teamSpan = document.createElement('span');
                    teamSpan.textContent = team.title;
                    
                    teamSpan.style.color = "#00529F";
                    teamSpan.style.textDecoration = "underline";
                    teamSpan.style.marginRight = "8px";
                    teamSpan.style.cursor = "pointer";

                    teamSpan.addEventListener('mouseover', function(event) {
                        tooltip.textContent = "Located in: " + team.city + ", " + team.country;
                        tooltip.style.left = (event.pageX + 15) + 'px';
                        tooltip.style.top = (event.pageY + 15) + 'px';
                        tooltip.style.display = 'block';
                    });

                    teamSpan.addEventListener('mouseout', function() {
                        tooltip.style.display = 'none';
                    });

                    teamsP.appendChild(teamSpan);
                }
                
                infoDiv.appendChild(teamsP);
                grid.appendChild(article);
            }
        }

        if (spelersGevonden === true) {
            container.appendChild(sectie);
        }
    }
}