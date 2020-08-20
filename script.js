'use strict';

document.addEventListener('DOMContentLoaded', loaded);

function loaded() {

    var square_size = 30;
    var grid_width = 36; //Work only if it is an even number
    var grid_height = 16;

    var middle = (grid_width * grid_height)/2;
    var terrain = [];


    var grass = `<div class='square grass'></div>`;
    var dirt = `<div class='square dirt'></div>`

    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min)) // max is not include in the results
    }

    function getRandomSequence (type) {

        if (type == undefined) {
            type = dirt;
        }

        let sequence = [];
        var half_grid_height = grid_height/2;
        let tempNumber = getRandomInt(0, (Math.round(60*half_grid_height/100) + 1));
        var number = 0;
        
        if (type == grass) {

            tempNumber = 1;

            console.log('oui je suis grass');
            for (let i = 0; i < grid_width; i++) {

                do {
                    number = getRandomInt(0, 3);
                } while (number > tempNumber + 1 || number < tempNumber - 1);

                tempNumber = number;
                sequence[i] = number;
            }
        }
        else {

            for (let i = 0; i < grid_width; i++) {

                do {
                    number = getRandomInt(0, (Math.round(60*half_grid_height/100) + 1));
                } while (number >= tempNumber + 2 || number <= tempNumber - 2);
    
                tempNumber = number;
                sequence[i] = number;
            }
        }


        

        return sequence;
    }

    function setTerrainType (height, type, i) {

        if (height == 0) {

            return true;
        }

        if (type == grass) {

            terrain[middle + i - (grid_width * height)] = type;
        }
        else if (type == dirt) {

            if (terrain[middle + i] != grass) {

                terrain[middle + i] = dirt;
            }
            
            terrain[middle + i + (grid_width * height)] = type;

        }

        setTerrainType(height - 1, type, i);
    }

    for (let i = 0; i < grid_width * grid_height; i++) {

        if (i >= (grid_width * grid_height)/2 ) {

            terrain[i] = `<div class='square rock'></div>`;
        } 
        else {

            terrain[i] = `<div class='square sky'></div>`;
        }
    }

    let grass_sequence = getRandomSequence(grass);
    console.log(grass_sequence);

    for (let i = 0; i < grass_sequence.length; i++) {

        setTerrainType(grass_sequence[i], grass, i);

        if (grass_sequence[i] == 0) {

            terrain[middle + i] = grass;
            terrain[middle + i + grid_width] = dirt;

            if (middle + i == middle) {

                if (terrain[middle + i + 1] != grass) {

                    terrain[middle + i + 1] = dirt;
                }
            } 
            else if (middle + i == middle + (grid_width - 1)) {

                if (terrain[middle + i - 1] != grass) {

                    terrain[middle + i - 1] = dirt;
                }
            }
            else {

                if (terrain[middle + i - 1] != grass) {

                    terrain[middle + i - 1] = dirt;
                }

                if (terrain[middle + i + 1] != grass) {

                    terrain[middle + i + 1] = dirt;
                }
            }
        }
    }

    let dirt_sequence = getRandomSequence();

    for (let i = 0; i < dirt_sequence.length; i++) {

        setTerrainType(dirt_sequence[i], dirt, i);

        if (dirt_sequence[i] == 0) {

            if (terrain[middle + i] != grass) {

                terrain[middle + i] = dirt;
            }
        }

    }

    console.log(terrain);

    $('#container').append(`<div id='terrain' style='width: ${square_size * grid_width}px'></div>`)

    for (let i = 0; i < terrain.length; i++) {

        $('#terrain').append(terrain[i]);
    }
}