const deafault_settings = { Teams: [], History: [], Settings:[] };

window.onload = () => {

    var body = document.body.querySelector( 'div' ); var footer = document.body.querySelector( 'footer' );
    var image = document.createElement( 'img' ); footer = footer.querySelectorAll( 'button' );

    footer[ 0 ].addEventListener( 'click', () => { return alert( 'Hi ! ' ); });

    footer[ 1 ].addEventListener( 'click', Teams );

    for ( var a = 0; a < footer.length; a++ ) {
        
        footer[ a ].addEventListener( 'click', () => { return image.remove(); });

    }; return start_image_animation();

    function start_image_animation() {

        try {

            image.src = './Images/Dhoni.png'; image.style.width = '100vw'; image.style.height = '80vh';

            body.appendChild( image ); setTimeout( () => { return animation_images( image ); },2000 );

        } catch ( err ) {

            return console.log( err, 'This indicates that Image animation is closed ! ' );

        };

    };

};

function animation_images( image ) {

    var closure = false; const Images = [ 'Dhoni.png', 'Virat_kohli.png', 'Kapil_Dev.png', 'Bhumra.png' ];

    for ( var a = 0; a <= Images.length; a++ ) {

        if ( closure == true ) { return console.log( 'Image animation closed ! ' ); }
        else {

            if ( a == Images.length ) { return change_image( 0 ); }; change_image( a );

        };

    }; function change_image( count ) {

        setTimeout( () => {
            
            try { image.src = './Images/' + Images[ count ]; } catch ( err ) {

                console.log( err, 'This indicates that Image animation is closed ! ' );

                return closure = true;

            };
    
        },5000 * a );
        
    };

};

function Teams() {

    var body = document.body.querySelector( 'div' ); body.id = 'cloud'; body.innerHTML = '';

    var data = localStorage.getItem( 'cricket_scorer' );

    if ( data == null ) { localStorage.setItem( 'cricket_scorer', JSON.stringify( deafault_settings ) ); };

    data = JSON.parse( localStorage.getItem( 'cricket_scorer' ) );

    var add_team = document.createElement( 'button' ); add_team.innerHTML = 'Add Team';
    add_team.style.bottom = '2vh'; add_team.style.right = '2vh';

    var list_teams = document.createElement( 'table' ); list_teams.style.width = '50vw';

    body.appendChild( add_team ); body.appendChild( list_teams ); var li; Load_teams();

    add_team.addEventListener( 'click', () => {

        return Take_input( 'The New Team name is...', ( answer ) => {

            data.Teams.push( { name: answer, players: [] } );
            
            update_cricket_scorer_on_storage( data ); return Load_teams();

        });

    });

    function Load_teams() {

        var body = document.body.querySelector( 'div' );

        list_teams.innerHTML = '';

        for ( var a = 0; a < data.Teams.length; a++ ) {

            li = document.createElement( 'tr' ); li.innerHTML = data.Teams[ a ].name;
            li.className = a; list_teams.appendChild( li );

            li.addEventListener( 'click', ( event ) => {

                var name = event.target.innerHTML; var number = event.target.className; return Load_Team_Screen();
                
                function Load_Team_Screen() {

                    body.innerHTML = ''; var heading = document.createElement( 'h1' );
                    heading.innerHTML = name; body.appendChild( heading );

                    var delete_team = document.createElement( 'button' ); delete_team.className = 'delete';
                    delete_team.innerHTML = 'Delete this Team ! '; body.appendChild( delete_team );

                    delete_team.addEventListener( 'click', () => {

                        data.Teams.splice( number, 1 ); update_cricket_scorer_on_storage( data ); return Teams();

                    });

                    var add_player = document.createElement( 'button' ); add_player.innerHTML = 'Add Player';
                    body.appendChild( add_player ); add_player.style.bottom = '2.5vh';
                    add_player.style.right = '2.5vh';

                    add_player.addEventListener( 'click', () => {

                        return Take_input( 'The New Player name is...', ( answer ) => {

                            data.Teams[ number ].players.push({

                                name: answer, score: 0, sixes: 0, fours: 0, wickets_taken: 0, bowled_given: 0,
                                caught: 0, hit_wicket: 0, wide: 0, stumping: 0, catch_out: 0, run_out: 0,
                                stumped: 0, catch_taken: 0, bowl_faced: 0, strike_rate: 0, half_centuries: 0,
                                centuries: 0, double_centuries: 0, triple_centuries: 0, Hattrick: 0, captainship: 0,
                                won_on_your_captionship: 0, lose_on_your_captainship: 0, Man_of_the_Match: 0,
                                Matches_played: 0

                            });

                            update_cricket_scorer_on_storage( data ); return Load_Team_Screen();

                        });

                    });

                    return Load_Players();

                    function Load_Players() {

                        var table = document.createElement( 'table' ); body.appendChild( table ); var tr;

                        for ( var b = 0; b < data.Teams[ number ].players.length; b++ ) {

                            tr = document.createElement( 'tr' ); table.appendChild( tr );
                            tr.className = b; tr.innerHTML = data.Teams[ number ].players[ b ].name;

                            tr.addEventListener( 'click', ( event ) => {

                                var player = event.target.innerHTML; body.innerHTML = '';
                                var player_heading = document.createElement( 'h1' );
                                player_heading.innerHTML = player; body.appendChild( player_heading );
                                var grid = document.createElement( 'table' ); body.appendChild( grid );
                                grid.className = 'grid-set-of-players-data';
                                
                                var first_row = grid.insertRow( 0 );
                                var second_row = grid.insertRow( 1 );
                                var third_row = grid.insertRow( 2 );
                                var fourth_row = grid.insertRow( 3 );
                                var fifth_row = grid.insertRow( 4 );

                                var score = first_row.insertCell( 0 );
                                var sixes = first_row.insertCell( 1 );
                                var fours = first_row.insertCell( 2 );
                                var wickets_taken = first_row.insertCell( 3 );
                                var bowled_given = first_row.insertCell( 4 );

                                var caught = second_row.insertCell( 0 );
                                var hit_wicket = second_row.insertCell( 1 );
                                var wide = second_row.insertCell( 2 );
                                var stumping = second_row.insertCell( 3 );
                                var catch_out = second_row.insertCell( 4 );

                                var run_out = third_row.insertCell( 0 );
                                var stumped = third_row.insertCell( 1 );
                                var catch_taken = third_row.insertCell( 2 );
                                var bowl_faced = third_row.insertCell( 3 );
                                var strike_rate = third_row.insertCell( 4 );

                                var half_centuries = fourth_row.insertCell( 0 );
                                var centuries = fourth_row.insertCell( 1 );
                                var double_centuries = fourth_row.insertCell( 2 );
                                var triple_centuries = fourth_row.insertCell( 3 );
                                var Hattrick = fourth_row.insertCell( 4 );

                                var captainship = fifth_row.insertCell( 0 );
                                var won_on_your_captionship = fifth_row.insertCell( 1 );
                                var lose_on_your_captainship = fifth_row.insertCell( 2 );
                                var Man_of_the_Match = fifth_row.insertCell( 3 );
                                var Matches_played = fifth_row.insertCell( 4 );

                                score.innerHTML = 'score';
                                sixes.innerHTML = 'sixes';
                                fours.innerHTML = 'fours';
                                wickets_taken.innerHTML = 'wickets_taken';
                                bowled_given.innerHTML = 'bowled_given';

                                caught.innerHTML = 'caught';
                                hit_wicket.innerHTML = 'hit_wicket';
                                wide.innerHTML = 'wide';
                                stumping.innerHTML = 'stumping';
                                catch_out.innerHTML = 'catch_out';

                                run_out.innerHTML = 'run_out';
                                stumped.innerHTML = 'stumped';
                                catch_taken.innerHTML = 'catch_taken';
                                bowl_faced.innerHTML = 'bowl_faced';
                                strike_rate.innerHTML = 'strike_rate';

                                half_centuries.innerHTML = 'half_centuries';
                                centuries.innerHTML = 'centuries';
                                double_centuries.innerHTML = 'double_centuries';
                                triple_centuries.innerHTML = 'triple_centuries';
                                Hattrick.innerHTML = 'Hattrick';

                                captainship.innerHTML = 'captainship';
                                won_on_your_captionship.innerHTML = 'won_on_your_captionship';
                                lose_on_your_captainship.innerHTML = 'lose_on_your_captainship';
                                Man_of_the_Match.innerHTML = 'Man_of_the_Match';
                                Matches_played.innerHTML = 'Matches_played';

                                bowled_given.className = 'last';
                                catch_out.className = 'last';
                                strike_rate.className = 'last';
                                Hattrick.className = 'last';
                                Matches_played.className = 'last';

                            });

                        };

                    };

                };
            
            });
            
        };

    };

};

function update_cricket_scorer_on_storage( data ) {
    
    return localStorage.setItem( 'cricket_scorer', JSON.stringify( data ) );

};

function Take_input( question, after_that ) {

    var body = document.body.querySelector( 'div' ); var answer;

    var div = document.createElement( 'div' ); var input = document.createElement( 'input' );
    input.type = 'text'; input.placeholder = question; div.appendChild( input );

    div.addEventListener( 'dblclick', () => { return div.remove(); });

    input.addEventListener( 'keydown', ( event ) => {

        if ( event.key == 'Enter' ) { answer = input.value; div.remove(); return after_that( answer ); };
        
    });

    var enter = document.createElement( 'button' ); enter.innerHTML = 'Enter ⏎ '; div.appendChild( enter );

    enter.addEventListener( 'click', () => { answer = input.value; div.remove(); return after_that( answer ); });

    div.className = 'input'; body.appendChild( div );

};