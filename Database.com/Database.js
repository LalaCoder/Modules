import { Run_Function } from 'https://lalacoder.github.io/Modules/Module_for_JS.js';

const Key = {

    Key: 'https://script.google.com/macros/s/AKfycbwQMf-OBKcGmtyIsQR_L3rrboKuZHxZx98Zp5OZ9jQlLr4y00x-z9PZJuqMtdoR5mYc/exec',

    Web_Link: 'https://www.Database.com',

    Method: ( type, api ) => {

        const Data_API = new XMLHttpRequest();

        Data_API.open( type, Database.Key.Key + '?acess_token=Database.com&api=' + api );

        Data_API.send();

        Data_API.onload = () => {

            sessionStorage.setItem( 'Database.com', Data_API.responseText );

        };

        Data_API.onerror = () => {

            console.error( 'Sorry ! Your Database Failed with Connection Timed Out...' );

            console.warn( 'You could Try Again after a day...' );
            console.warn( 'Else you must purchase Premium pack on ' + Database.Key.Web_Link + ' ...' );

            return false;

        };

    },

    API_Connect: () => {

        const API = sessionStorage.getItem( 'API' );

        if ( API == null ) {

            console.warn( 'Please Authorize your API to use it...' );

            return false;

        } else { return JSON.parse( API ); };

    },

    API_JOB_FAILURE: ( Request_Response ) => {

        const Requested_Response = Object.keys( Request_Response );

        if ( ! ( Requested_Response.indexOf( 'JOB' ) == -1 &&
        Requested_Response.indexOf( 'FAILURE' ) == -1 ) ) {

            console.error( Request_Response );
            console.error( JSON.stringify( Request_Response ) );

            return false;

        } else { return true; };

    },

    Object_Type: ( Request_Response ) => {

        if ( typeof( Request_Response ) !== 'object' ) {

            console.error( Request_Response + ' is not an Proper Object Data...!!!' );

            return false;

        } else if ( Array.isArray( Request_Response ) ) {

            return 'Array';

        } else { return true; };

    },

    Un_Hash: ( hash_key, hash_rule ) => {

        var hash_code = ''; var symbols = false;

        for ( var a = 0; a < hash_key.length; a++ ) {
    
            symbols = true;
    
            for ( var b = 0; b < hash_rule.length; b++ ) {
    
                if ( ( hash_rule[ b ].replace ).toLowerCase() == ( hash_key[ a ] ).toLowerCase() ) {
    
                    hash_code += ( hash_rule[ b ].with ).toLowerCase();
    
                    b = hash_rule.length; symbols = false;
    
                };
    
            }; if ( symbols ) { hash_code += hash_key[ a ]; };

        }; return hash_code;

    },

    Generate_Hash_Rule: () => {

        var Current_alphabets = Database.Key.Alphabets;

        var hash_rule = new Array();
        var each_rule = new Object();

        var random_rule = 0;

        for ( var a = 0; a < Database.Key.Alphabets.length; a++ ) {

            each_rule.replace = Database.Key.Alphabets[ a ];
    
            random_rule = Math.floor(
                
                Run_Function.maths.random( 0, Current_alphabets.length - 1 )
                
            );
    
            each_rule.with = Current_alphabets[ random_rule ];
    
            Current_alphabets = Run_Function.array.removeItem( Current_alphabets, random_rule );
    
            hash_rule.push( each_rule );
    
            each_rule = new Object();
    
        }; return hash_rule;

    },

    Alphabets: [
            
        "A","B","C","D","E","F","G","H","I","J","K","L","M",
        "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
        "1","2","3","4","5","6","7","8","9","0","!","@","#",
        "$","%","^","&","*","(",")","`","~","-","_","+","=",
        "[","]","{","}","|",";",":","'",'"',"<",">",".","?",","
    
    ]

};

const API = {

    Authorize: ( Client ) => {

        const Object_Type = Database.Key.Object_Type( Client );

        if ( Object_Type != true ) { return false; };

        if ( Client.API == null || Client.Username == null || Client.Password == null ) {

            console.error( 'Missing Authorization Creditals ! ' );
            console.warn( 'Overall Creditals are 3 --> Username, Password, API...' );

            return false;

        }; if ( sessionStorage.getItem( 'Database.com' ) == null ) {

            Database.Key.Method( 'GET', Client.API );

        }; return Database.API.Repeat_Authorization_on_Size( Client );

    },

    Read: () => {

        const API = Database.Key.API_Connect();
        const Data = JSON.parse( API.Data );

        return Data;

    },

    Repeat_Authorization_on_Size: ( Client ) => {

        setTimeout( () => {

            if ( sessionStorage.getItem( 'Database.com' ) == null ) {

                return Database.API.Repeat_Authorization_on_Size( Client );

            } else {

                const Request_Response = JSON.parse( sessionStorage.getItem( 'Database.com' ) );

                const Error_Strike = Database.Key.API_JOB_FAILURE( Request_Response );

                if ( Error_Strike == false ) { return false; }

                if ( Request_Response.API != Client.API ) {

                    console.error( 'Sorry ! Your API disconnected due to Nothing...! ' );

                    return false; // This Condition may be not Reachable...

                } else if ( Request_Response.Username != Client.Username ) {

                    console.error( 'Client Not Authorized due to Invalid Username...!!!' );

                    return false;

                } else {

                    const Hash_Pass = Database.Key.Un_Hash( Request_Response.Password, JSON.parse( Request_Response.Hash_Rule ) );
                    
                    if ( Hash_Pass != Client.Password )

                    { console.error( 'Client Not Authorized due to Invalid Password...!!!' ); return false; };
                    
                    console.log( 'Client Sucessfully Authorized...' );

                    sessionStorage.setItem( 'API', JSON.stringify( {

                        Type: Request_Response.TYPE,
                        Data: Request_Response.Database
                        
                    } ) ); return true;

                };
        
        };

        },500 );

    }

};

const Database = {

    API: API,
    Key: Key

};

window.onload = () => {

    const Handle_Authorization = {

        API: 'kajshjsjssjshsjja',
        Username: 'testdemo@database.com',
        Password: '~t9xl-{ww)~i'

    };

    let lala = document.body.querySelector( 'button' );
    lala.addEventListener( 'click', () => {

        Database.API.Authorize( Handle_Authorization );

    });

    let get_records = document.body.querySelectorAll( 'button' );
    get_records[ 1 ].addEventListener( 'click', () => {

        const My_Data = Database.API.Read();
        console.log( 'This is my Data', My_Data );

        let Home = document.body.querySelector( 'table' ).querySelectorAll( 'tr' )[ 1 ];

        let Home_data = document.createElement( 'td' );
        Home_data.textContent = Handle_Authorization.API;

        Home.appendChild( Home_data );
        
        Home_data = document.createElement( 'td' );
        Home_data.textContent = Handle_Authorization.Username;

        Home.appendChild( Home_data );

        Home_data = document.createElement( 'td' );
        Home_data.textContent = Handle_Authorization.Password;

        Home.appendChild( Home_data );

        let Office = document.body.querySelectorAll( 'table' );
        Office = Office[ 1 ];

        for ( var a = 0; a < My_Data.length; a++ ) {

            Home_data = document.createElement( 'tr' );

            if ( typeof( My_Data[ a ] ) === 'object' ) {

                if ( Array.isArray( My_Data[ a ] ) ) {

                    Home_data.textContent = '( An Array )';

                } else {

                    Home_data.textContent = '( An Object )';

                };

            } else {

                Home_data.textContent = My_Data[ a ];

            };

            Office.appendChild( Home_data );

        }; return true;

    });

};

export { Database };
