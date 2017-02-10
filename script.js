window.onload = function(){
    var request = new XMLHttpRequest();
    request.open("GET", "pokemon.json", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onload = function() {
        if(request.readyState == 4 && request.status == 200) {
            var array = JSON.parse(this.responseText);
            pokedex(array);
        } else {
            var errors= JSON.parse(xml.responseText);
            console.log(errors);
            }
        };


    function pokedex(poke) {
        var myForm = document.querySelector('#my-form');
        myForm.onsubmit = function () {
            var pokemonImg = document.querySelector('#pokemon-img');
            var pokemonText = document.querySelector('#pokemon-text');
            var inputValue = document.querySelector('#pokemon-value').value;
            var regExp = new RegExp('^[0-9]+$');
            pokemonText.innerHTML = '';
            pokemonImg.innerHTML = '';

            if (!regExp.test(inputValue)) {
              for (var i = 1; i < Object.keys(poke).length; i++) {
                  if (inputValue.toLowerCase() === poke[i].name.toLowerCase()) {
                      pokemonImg.innerHTML = '<img src="http://img.pokemondb.net/artwork/' + poke[i].name.toLowerCase() + '.jpg">';
                      pokemonText.innerHTML = 'Name : ' + poke[i].name + '<br>' +
                                              'Type : ' + poke[i].type;
                      break;
                  } else {
                      pokemonText.innerHTML = inputValue + " not found !";

                  }
              }
            } else {
              if (inputValue > 0 && inputValue < 152) {
                  var pokemonNumber = poke[inputValue];
                  pokemonImg.innerHTML = '<img src="http://img.pokemondb.net/artwork/' + pokemonNumber.name.toLowerCase() + '.jpg">';
                  pokemonText.innerHTML = 'Name : ' + pokemonNumber.name + '<br>' +
                                          'Type : ' + pokemonNumber.type;
              } else {
                  pokemonText.innerHTML = "Pokemon number " + inputValue + " not found !";
              }
            }
            return false;
        }
    }
        request.send();
        return false;
};
