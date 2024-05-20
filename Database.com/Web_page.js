window.onload = () => {

    if ( window.location.pathname.includes( 'index.html' ) ) {

        const buttons = document.body.querySelectorAll( 'button' );

        var sign_in_button = buttons[ 0 ];
        var sign_up_button = buttons[ 1 ];

        sign_in_button.addEventListener( () => {});

        sign_up_button.addEventListener( () => { return window.location.assign( './sign_up.html' ) });

    } else if ( window.location.pathname.includes( 'sign_up.html' ) ) {}

};