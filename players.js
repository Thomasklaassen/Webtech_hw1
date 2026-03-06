//init file input

var fileInput = document.getElementById('jsonFileInput');
var playersContainer = document.getElementById('players-container');

//event listener for file input change
fileInput.addEventListener('change', function() {
    var file = fileInput.files[0];

    if(!file) {
        return;
    }

    var reader = new FileReader();
    //when file is done loading
    reader.addEventListener('load', function() {
        //data
        var jsonText = reader.result;
        //actual js object
        var data = JSON.parse(jsonText);



        while(playersContainer.firstChild) {
            playersContainer.removeChild(playersContainer.firstChild);
        }

        for(var i = 0; i < data.sections.length; i++) {
            var section = data.sections[i];

            var sectionElement = document.createElement('section');
            sectionElement.className = 'card';

            var titleElement = document.createElement('h2');
            titleElement.className = 'section-title';
            titleElement.textContent = section.title;

            var gridElement = document.createElement('div');
            gridElement.className = 'player-grid';

            for(var j = 0; j < section.players.length; j++) {
                var player = section.players[j];
                //start element init
                var articleElement = document.createElement('article');
                articleElement.className = 'player-card';


                var imageElement = document.createElement('img');
                imageElement.src = player.image;
                imageElement.alt = player.name;
                imageElement.className = 'player-card__image';


                var infoElement = document.createElement('div');
                infoElement.className = 'player-card__info';


                var nameElement = document.createElement('h2');
                nameElement.className = 'player-card__name';
                nameElement.textContent = player.name;


                var positionElement = document.createElement('p');
                positionElement.className = 'player-card__position';
                positionElement.textContent = player.position;


                var numberElement = document.createElement('p');
                numberElement.className = 'player-card__number';
                numberElement.textContent = 'Number: ' + player.number;

                var linkElement = document.createElement('a');
                linkElement.href = player.link;
                linkElement.target = "_blank";
                linkElement.className = 'player-card__link';
                linkElement.textContent = "More Info";
                //end element init

                //append elements
                infoElement.appendChild(nameElement);
                infoElement.appendChild(positionElement);
                infoElement.appendChild(numberElement);
                infoElement.appendChild(linkElement);

                articleElement.appendChild(imageElement);
                articleElement.appendChild(infoElement);

                gridElement.appendChild(articleElement);
            }

            sectionElement.appendChild(titleElement);
            sectionElement.appendChild(gridElement);

            playersContainer.appendChild(sectionElement);
        }

        document.getElementById('upload-area').style.display = 'none';
    });
    reader.readAsText(file);

});
