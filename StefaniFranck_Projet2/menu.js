/*
     * ===================================================================
     * Définir une classe "Recette" pour décrire une recette en respectant
     * la structure des recettes qui se trouve dans le fichier XML
     * ===================================================================
     */
   class Recette {
    id;
    title;
    image;
    category;
    preptime;
    cooktime;
    portion;
    ingredientList;
    instructionList;

    constructor(id, title, image) {
        this.id = id;
        this.title = title;
        this.image = image;
    }
}

/*
 * ====================================================================
 * Début du script JS
 * ====================================================================
 */

// Variables globales
recettes = Array();
let urlRecette = 'recettes.xml';

// Après le chargement de la page HTML
window.onload = function(e) { 
    let api_key = 'bb93af51703a9386a8922ff96651c106';
    let urlMeteo = 'http://api.openweathermap.org/data/2.5/weather?q=Montreal,ca&lang=fr&units=metric&appid=' + api_key;
    loadJSON(urlMeteo);
    fetch(urlRecette)
        .then(reponse => reponse.text())          // Recevoir, du serveur Web, une chaine de caractères contenant le XML
        .then(xmlText => remplirTableau(xmlText)) // Remplir le tableau d'objet avec les informations du XML
        .then(() => listeRecette(recettes));      // Afficher le titre des recettes
}

/*
 * ===================================================================
 * Déclaration des fonctions
 * ===================================================================
 */
function remplirTableau(xmlText) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlText, "application/xml"); // la variable xmlDoc contient maintenat un document XML

    let tabRecettes = xmlDoc.getElementsByTagName("recipe"); // la variable tabRecettes contient un tableaux de recettes XML

    for (let i = 0; i < tabRecettes.length; i++) {
        let recette = new Recette(); // Créer une nouvelle recette

        recette.id = +tabRecettes[i].getAttribute("id");
        recette.title = tabRecettes[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        recette.image = tabRecettes[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;
        recette.category = tabRecettes[i].getElementsByTagName("category")[0].childNodes[0].nodeValue;
        recette.preptime = tabRecettes[i].getElementsByTagName("preptime")[0].childNodes[0].nodeValue;
        recette.cooktime = tabRecettes[i].getElementsByTagName("cooktime")[0].childNodes[0].nodeValue;
        recette.portion = tabRecettes[i].getElementsByTagName("yield")[0].childNodes[0].nodeValue;

        let tabIngredient = tabRecettes[i].getElementsByTagName("ingredient_list")[0].getElementsByTagName("ingredient");
        recette.ingredientList = Array();
        for (let j = 0; j < tabIngredient.length; j++) {
            recette.ingredientList.push(tabIngredient[j].childNodes[0].nodeValue);
            //console.log(tabIngredient[j].childNodes[0].nodeValue);
        }
        let tabInstruction = tabRecettes[i].getElementsByTagName("instruction_list")[0].getElementsByTagName("instruction");
        recette.instructionList = Array();
        for (let j = 0; j < tabInstruction.length; j++) {
            recette.instructionList.push(tabInstruction[j].childNodes[0].nodeValue);
            //console.log(tabInstruction[j].childNodes[0].nodeValue);
        }

        this.recettes.push(recette); // Ajouter la recette dans le tableau de recettes
    }
}

function listeRecette(recettes) {
    let contenu = "";
    
    for (let i = 0; i < recettes.length; i++) {
        contenu += '<article onclick="uneRecette(' + i + ')">';
        contenu += '<img src="'+ recettes[i].image+'" alt="'+ recettes[i].title+'">';
        contenu += '<h5>'+ recettes[i].title + '</h5>';
        
        contenu += '</article>';

    document.getElementById("recette").innerHTML = contenu;
    
            }
}

function uneRecette(i)  {
    let contenu = "<article>";
    
    
        contenu += '<img src="'+ recettes[i].image+'" alt="'+ recettes[i].title+'">';
        contenu += '<h2>'+ recettes[i].title + '</h2>';
        contenu += '<p>Temps de préparation : ' + recettes[i].preptime + '</p>';
        contenu += '<p>Temps de cuisson : ' + recettes[i].cooktime + '</p>';
        contenu += '<p>Portions : ' + recettes[i].portion + '</p>';
        contenu += '<h3>Ingrédients</h3>';
        contenu += '<ul>';
            for(let k = 0; k < recettes[i].ingredientList.length; k++) {
                contenu += '<li>' + recettes[i].ingredientList[k] + '</li>';
             }
        contenu += '</ul>';
        contenu += '<h3>Instructions</h3>';
        contenu += '<ul>';
            for(let k = 0; k < recettes[i].instructionList.length; k++) {
                contenu += '<li>' + recettes[i].instructionList[k] + '</li>';
             }
        contenu += '</ul>'; 
    
        contenu += '</article>';
    document.getElementById("recette").innerHTML = contenu;
}

function desserts() {
    let contenu= "";

        contenu +="<article>";
        contenu+="<img onClick='uneRecette(1)' src="+recettes[1].image+"></div>";
        contenu +="<h5>"+recettes[1].title+"</h5>";
        contenu+="<img onClick='uneRecette(3)' src="+recettes[3].image+"></div>";
        contenu +="<h5>"+recettes[3].title+"</h5>";
        contenu+="<img onClick='uneRecette(4)' src="+recettes[4].image+"></div>";
        contenu +="<h5>"+recettes[4].title+"</h5>";
        contenu+="</article>";
        document.getElementById("recette").innerHTML = contenu;
}

function poulets() {
    let contenu= "";

        contenu +="<article>";
        contenu+="<img onClick='uneRecette(0)' src="+recettes[0].image+"></div>";
        contenu +="<h5>"+recettes[0].title+"</h5>";
        contenu+="<img onClick='uneRecette(2)' src="+recettes[2].image+"></div>";
        contenu +="<h5>"+recettes[2].title+"</h5>";
        contenu+="<img onClick='uneRecette(5)' src="+recettes[5].image+"></div>";
        contenu +="<h5>"+recettes[5].title+"</h5>";
        contenu+="</article>";
        document.getElementById("recette").innerHTML = contenu;
}

function loadJSON(urlMeteo) {
    fetch(urlMeteo)
      .then(reponse => reponse.json())
      .then(data => afficheJSON(data));
  }
  
  function afficheJSON(objJSON){
    let contenu = "";

        contenu += "<h4>" + objJSON.main.temp + " °C." + "</h4>";
        contenu += "<h4>" + objJSON.name + "</h4>";
        contenu += "Temps: " + objJSON.weather[0].description + ", Humidity: " + objJSON.main.humidity +"<br>";
        contenu += "Vent: " + objJSON.wind.speed + " km/h";
        document.getElementById("meteo").innerHTML = contenu;
  }