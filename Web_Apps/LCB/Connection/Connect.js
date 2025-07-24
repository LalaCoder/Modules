window.onload = () => {

    if ( location.pathname.includes( 'Connect.html' ) ) {

        sessionStorage.setItem( '<connect>', 'Connected 👍' );

        let Connect = document.querySelector( 'button' );
        Connect.addEventListener( 'click', Connect_Data );

        let Local_Connect = document.querySelector( 'span' );
        Local_Connect.addEventListener( 'click', Connect_Locally );

        Import_Data();

    } else if ( location.pathname.includes( 'Disconnect.html' ) ) {

        if ( sessionStorage.getItem( '<connect>' ) == null ) { return location.href = './Connect.html'; };

        let Disconnect = document.querySelector( 'button' );
        Disconnect.addEventListener( 'click', Delete_Game_Data );

    };

};

function Connect_Data() {

    let Inputs = document.querySelectorAll( 'input' );
    let Game_Code = Inputs[ 0 ];
    let Game_PIN = Inputs[ 1 ];

    if ( Game_Code.value == '' || Game_PIN.value == '' ) {

        return alert( 'Cannot Continue Ahead due to Insufficient Information...!!!' );

    } else {

        const Game = JSON.parse( localStorage.getItem( 'Game' ) );

        const All_Game_Codes = Object.keys( Game.Code );

        if ( All_Game_Codes.indexOf( Game_Code.value ) == -1 ) {

            return alert( 'Sorry ! The Game not Found...' );

        } else {

            const Pass_PIN = Game.Code[ Game_Code.value ].PIN;

            if ( parseFloat( Game_PIN.value ) === Pass_PIN ) {

                sessionStorage.setItem( '<connect>', JSON.stringify( Game.Code[ Game_Code.value ].Data ) );
                sessionStorage.setItem( '<disconnect>', Game_Code.value );

                alert( 'The Game Successfully Connected ! ' );

            } else {

                return alert( 'The Game you tried to connect does not connect due to incorrect Game PIN...' );

            };

        };

    }; return location.href = '../Bussiness/index.html';

};

function Import_Data() {

    var Back_up = localStorage.getItem( 'Game' );

    if ( Back_up == null ) {

        var Back_up = new Object();
        Back_up[ 'Code' ] = new Object();
        Back_up[ 'Code' ][ 'localhost:9211' ] = new Object();

        Back_up[ 'Code' ][ 'localhost:9211' ][ 'PIN' ] = 9211;
        Back_up[ 'Code' ][ 'localhost:9211' ][ 'Data' ] = new Object();

        Back_up[ 'Code' ][ 'localhost:9211' ][ 'Data' ][ 'loans' ] = [];
        Back_up[ 'Code' ][ 'localhost:9211' ][ 'Data' ][ 'Accounts' ] = [];

        Back_up = JSON.stringify( Back_up );
        localStorage.setItem( 'Game', Back_up );

    }; Back_up = JSON.parse( Back_up );

};

function Connect_Locally() {

    let Inputs = document.querySelectorAll( 'input' );
    let Game_Code = Inputs[ 0 ];
    let Game_PIN = Inputs[ 1 ];

    Game_Code.value = 'localhost:9211';
    Game_PIN.value = '9211';

    return Connect_Data();

};

function Delete_Game_Data() {

    let Inputs = document.querySelectorAll( 'input' );
    let Game_Code = Inputs[ 0 ];
    let Game_PIN = Inputs[ 1 ];

    const Game = JSON.parse( localStorage.getItem( 'Game' ) );

    if ( Object.keys( Game.Code ).indexOf( Game_Code.value ) == -1 ) {

        return alert( 'Sorry Your Specified Game does not Exists...' );

    } else {

        if ( Game_Code.value == 'localhost:9211' ) {

            return alert( 'You cannot Disconnect or Delete localhost Game ❗ ' );

        } else {

            const PIN = Game.Code[ Game_Code.value ].PIN;

            if ( parseFloat( Game_PIN.value ) === parseFloat( PIN ) ) {

                var Edit_Game_Config = Game;

                try {
                    
                    delete Edit_Game_Config.Code[ Game_Code.value ];

                } catch ( e ) { return console.warn( e ); }

                Edit_Game_Config = JSON.stringify( Edit_Game_Config );

                localStorage.setItem( 'Game', Edit_Game_Config );

            } else {

                return alert( 'Sorry ! Wrong PIN Provided to Disconnect...' );

            };

        };

    }; alert( 'Your Specified Game Successfully Deleted or Disconnected from the Server...!!!' );

    return location.href = '../Connection/Connect.html';

};