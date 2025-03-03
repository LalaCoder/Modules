window.onload = () => {

    const buttons = document.body.querySelectorAll( 'button' );

    const button_database = Array.from( buttons ).find( btn => btn.id === 'Database.com' );

    const button_Module_for_JS = Array.from( buttons ).find( btn => btn.id === 'Module_for_JS' );

    button_database.onclick = () => {

        return window.location.href = './Database.com/index.html';

    };

    button_Module_for_JS.onclick = () => {

        const text = "import { Run_Function } from 'https://lalacoder.github.io/Modules/Module_for_JS.js';";

        navigator.clipboard.writeText( text ).then( () => {

            button_Module_for_JS.innerText = "Copied to your clipboard!";
            button_Module_for_JS.disabled = true;

        }).catch( err => console.error( "Failed to copy: ", err ) );

    };

};