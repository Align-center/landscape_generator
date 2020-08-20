'use strict';

document.addEventListener('DOMContentLoaded', loaded);

function loaded() {

    var square_width = 50;
    var grid_width = 24;
    var grid_height = 10;

    var middle = (grid_width * grid_height)/2;
    var terrain = [];


    var grass = `<div class='square grass'></div>`;
    var dirt = `<div class='square dirt'></div>`

    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min)) // max is not include in the results
    }

    function getRandomSequence () {

        let sequence = [];

        for (let i = 0; i < grid_width; i++) {

            sequence[i] = getRandomInt(0, 3);
        }

        return sequence;
    }


    for (let i = 0; i < grid_width * grid_height; i++) {

        if (i >= (grid_width * grid_height)/2 ) {

            terrain[i] = `<div class='square rock'></div>`;
        } 
        else {

            terrain[i] = `<div class='square sky'></div>`;
        }
    }

    let grass_sequence = getRandomSequence();

    for (let i = 0; i < grass_sequence.length; i++) {
        
        if (grass_sequence[i] == 1) {

            terrain[middle + i - grid_width] = grass;
        }
        else if (grass_sequence[i] == 2) {

            terrain[middle + i - (grid_width*2)] = grass;
            terrain[middle + i - grid_width] = grass;
        }
        else {

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

    let dirt_sequence = getRandomSequence(0, 3);
    console.log(dirt_sequence);

    for (let i = 0; i < dirt_sequence.length; i++) {

        if (dirt_sequence[i] == 1) {

            terrain[middle + i + grid_width] = dirt;

            if (terrain[middle + i] != grass) {

                terrain[middle + i] = dirt;
            }
        }
        else if (dirt_sequence[i] == 2) {

            terrain[middle + i + grid_width] = dirt;
            terrain[middle + i + (grid_width*2)] = dirt;

            if (terrain[middle + i] != grass) {

                terrain[middle + i] = dirt;
            }
        }
        else {

            if (terrain[middle + i] != grass) {

                terrain[middle + i] = dirt;
            }

        }
    }

    console.log(terrain);

    $('#container').append(`<div id='terrain' style='width: ${square_width * grid_width}px'></div>`)

    for (let i = 0; i < terrain.length; i++) {

        $('#terrain').append(terrain[i]);
    }
}