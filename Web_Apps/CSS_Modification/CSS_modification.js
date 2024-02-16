window.onload = () => {

    if ( window.location.pathname.includes( 'process.html' ) ) {

        setTimeout( () => {

            return Modify_File( JSON.parse( sessionStorage.getItem( 'File' ) ) );

        },1000 );
        
    } else {

        var p = document.body.querySelector( 'p' );
        var input = document.body.querySelector( 'input' );
        var button = document.body.querySelector( 'button' );

        p.addEventListener( 'click', () => {

            input.className = 'alert';

            setTimeout( () => {
                
                alert( 'Please Upload your File Here, In the Highlighted Area ! ' );

                setTimeout( () => { return input.className = ''; },2000 );
        
            },1000 );

        });

        button.addEventListener( 'click', () => { File_Editor( input.files[ 0 ] ); });

        input.addEventListener( "change", () => {

            if ( input.files.length == 1 ) {

                const type = input.files[ 0 ].type.toLowerCase();

                if ( type == 'text/plain' || type == 'text/css' ) {

                    return button.style.visibility = 'visible';

                } else {

                    return button.style.visibility = 'hidden';

                };

            };

        });

    };

};

function File_Editor( file ) {

    var File_Reader = new FileReader();

    File_Reader.readAsText( file );

    var File_data = new Array();

    File_Reader.result;

    File_Reader.onload = () => {

        File_data = ( File_Reader.result ).split( '\r\n' );

        sessionStorage.setItem( 'File', JSON.stringify( File_data ) );

        return window.location.assign( './process.html' );

    };

};

function Modify_File( File ) {

    const File_length = File.length;
    
    var new_file = new Array(); var line = ''; var LeNgTh = ''; var Left_Over = '';

    for ( var a = 0; a < File_length; a++ ) {

        if ( File[ a ].length > 110 ) {

            for ( var b = 0; b <= 110; b++ ) {

                line += File[ a ].charAt( b );
    
            }; Left_Over = File[ a ].slice( 111 ); Left_Over_Add_Over( a ); new_file.push( line );

        } else if ( File[ a ].length == 110 ) { new_file.push( File[ a ] ); } else {

            if ( a == File_length ) { return new_file.push( LeNgTh ); };

            LeNgTh = File[ a ] + File[ a + 1 ]; LeNgTh = LeNgTh.toString(); var b = 1; var e = LeNgTh.length;

            for ( var d = 0; e <= 110; d++ ) {

                if ( File_length <= b ) { return new_file.push( LeNgTh ); };

                b += 1; LeNgTh = LeNgTh.toString() + ( File[ b ] ).toString(); e = LeNgTh.length;

            }; for ( var c = 0; c <= 110; c++ ) {

                line += LeNgTh.charAt( c );
    
            }; if ( LeNgTh.slice( 111 ).length > 0 ) { Left_Over = LeNgTh.slice( 111 ); };

            new_file.push( line ); a += b; Left_Over_Add_Over( a );

        }; line = '';

    }; return console.log( new_file );

    function Left_Over_Add_Over( a ) { File[ a + 1 ] = Left_Over + File[ a + 1 ]; };

};