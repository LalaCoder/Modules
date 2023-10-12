var Run_Function = new Object();
Run_Function.maths = new Object();
Run_Function.array = new Object();
Run_Function.type = new Object();

Run_Function.maths.random = ( min, max ) => { max += 1; return ( Math.random() * ( max - min ) + min ); };

Run_Function.say = ( Statement, time_seconds, at_x_px, at_y_px ) => {

    let say_box = document.createElement('span');
    document.body.appendChild( say_box );
    say_box.id = 'say';
    say_box.style.left = at_x_px + 'px';
    say_box.style.top = at_y_px + 'px';
    say_box.innerHTML = Statement;

    setTimeout( () => {

        document.body.removeChild( say_box );
        say_box.remove();

    },time_seconds * 1000 );

};

Run_Function.array.PLITF = ( array ) => { // PLITF = Put Last Item to First

    var temp_array = new Array();

    for ( var temp = 0; temp < array.length - 1; temp++ ) { temp_array.push( array[temp] ); }

    temp_array.unshift( array[ array.length - 1 ] );

    return temp_array;

};

Run_Function.array.ATCNF = ( array ) => { // ATCNF = Array to Class Name Format

    var className = '';
    var CLASSname = '';

    for ( var cn = 0; cn < array.length; cn++ ) { className += ( array[cn] + ' ' ) }

    for ( var cn = 0; cn < className.length - 1; cn++ ) { CLASSname += className[cn] }

    className = CLASSname;
    CLASSname = null;

    return className;

};

Run_Function.array.RAPEFA = ( array, item_no ) => { // RAPEFA = Remove a particular element from array

    var new_array = new Array();

    for ( var p = 0; p < array.length; p++ ) { if ( p != item_no ) { new_array.push( array[ p ] ) } };

    return new_array;

};

Run_Function.type.Identify = ( Data ) => {

    const alphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    for (var sol = 0; sol < Data.length; sol++) {

        for (var sov = 0; sov < 26; sov++) {

            if ( Data[sol].toUpperCase() == alphabets[sov] ) { return "String"; };

        };

    }; return "int";

};

Run_Function.array.removeItem( array, Item ) => {

    var new_array = new Array();

    for ( var a = 0; a < array.length; a++ ) {

        if ( a != item ) { new_array.push( array[ a ] ); };

    }; return new_array;
    
};

export { Run_Function };
