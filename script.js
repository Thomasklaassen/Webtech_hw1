document.addEventListener('DOMContentLoaded', function() {
    
    maakStylingMenus();
    maakEventPropagationAan();

});

function maakStylingMenus() {
    let elementSelect = document.getElementById('elementSelect');
    let styleSelect = document.getElementById('styleSelect');

    if (!elementSelect || !styleSelect) {
        return; 
    }

    let tagsOmTeZoeken = ['body', 'article', 'section', 'h1', 'p'];

    for (let i = 0; i < tagsOmTeZoeken.length; i++) {
        let tag = tagsOmTeZoeken[i];
        
        let gevondenElementen = document.getElementsByTagName(tag);

        if (gevondenElementen.length > 0) {
            let nieuweOptie = document.createElement('option');
            nieuweOptie.value = tag;
            nieuweOptie.textContent = tag;
            elementSelect.appendChild(nieuweOptie); 
        }
    }

    styleSelect.addEventListener('change', function(event) {
        let gekozenTag = elementSelect.value;
        let gekozenStijl = event.target.value;

        if (gekozenTag === "" || gekozenStijl === "") {
            return;
        }

        let elementenOmAanTePassen = document.getElementsByTagName(gekozenTag);

        for (let i = 0; i < elementenOmAanTePassen.length; i++) {
            let element = elementenOmAanTePassen[i];

            if (gekozenStijl === 'color-red') {
                element.style.color = 'red';
            } else if (gekozenStijl === 'color-blue') {
                element.style.color = '#00529F';
            } else if (gekozenStijl === 'size-large') {
                element.style.fontSize = '24px';
            } else if (gekozenStijl === 'size-small') {
                element.style.fontSize = '12px';
            }
        }
    });
}

function maakEventPropagationAan() {

    let footer = document.getElementById('mainFooter');
    let container = document.getElementById('footerContainer');

    if (!footer || !container) {
        return;
    }

    container.addEventListener('click', function(event) {
        console.log("Klik op de container! (Kind)");
        event.stopPropagation(); 
    });

    footer.addEventListener('click', function(event) {
        console.log("Klik op de footer! (Ouder)");
    });
}