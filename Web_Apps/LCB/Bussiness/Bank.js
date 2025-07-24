const Every_Round_Money = 1500;
var Bank_Interest_Demand = 2;

window.onload = () => {
    
    const minwidth = window.matchMedia( "(min-width: 0px)" );
    const maxwidth = window.matchMedia( "(max-width: 1279px)" );

    if ( minwidth.matches && maxwidth.matches ) {

        if ( ! ( location.pathname.includes("/Device_Not_Eligible.html") ) ) {

            return location.href="../Meta_Data/Device_Config/Device_Not_Eligible.html";

        };

    } else {

        //Continue with the Main Screen because Device Passed to open the website...

        var URL; if ( location.pathname.includes( "/Device_Not_Eligible.html" ) ) {

            location.href = "../../Bussiness/index.html";

            URL = '../../Connection/Connect.html';

        } else { URL = '../Connection/Connect.html'; };
        
        if ( sessionStorage.getItem( '<connect>' ) == null ) {
                
            return location.href = URL;
        
        } else {

            const Connect_Data = JSON.parse( sessionStorage.getItem( '<connect>' ) );

            if ( ( Connect_Data.Accounts.length != 0 && Connect_Data.loans.length != 0 ) ) {

                Read_Game_Data( Connect_Data );

            }; return Initialise_Listeners();

        };

    };

};

function Read_Game_Data( Data_Set ) {

    let Accounts = document.getElementById( 'Accounts_Table' );
    let Loans = document.getElementById( 'Data' );

    var Cell, Row;

    for ( var a = 0; a < Data_Set[ 'Accounts' ].length; a++ ) {

        Row = document.createElement( 'tr' );

        for ( var b = 0; b < Data_Set[ 'Accounts' ][ a ].length; b++ ) {

            Cell = document.createElement( 'td' );
            Cell.textContent = Data_Set[ 'Accounts' ][ a ][ b ];

            Row.appendChild( Cell );

        }; Accounts.appendChild( Row );

    }; // For Accounts Readings...

    for ( var c = 0; c < Data_Set[ 'loans' ].length; c++ ) {

        Row = document.createElement( 'tr' );

        for ( var d = 0; d < Data_Set[ 'loans' ][ c ].length; d++ ) {

            Cell = document.createElement( 'td' );
            Cell.textContent = Data_Set[ 'loans' ][ c ][ d ];

            Row.appendChild( Cell );

        }; Loans.appendChild( Row );

    }; // For Loans Readings...

};

function Initialise_Listeners() {

    let Add = document.getElementById( 'Add' );
    Add.addEventListener( 'click', Data );

    let Purpose_Selector = document.getElementById( 'purpose' );
    Purpose_Selector.addEventListener( 'dblclick', List_Purposes );

    let Add_Account = document.getElementById( 'Add_Account' );
    Add_Account.addEventListener( 'click', Add_New_Account );

    let Update_Account = document.getElementById( 'Update_Account' );
    Update_Account.addEventListener( 'click', Update_Account_Details );

    let Add_Round = document.getElementById( 'Add_Round' );
    Add_Round.addEventListener( 'click', Add_Member_Round );

    let Remove_Loan = document.getElementById( 'Remove_Loan' );
    Remove_Loan.addEventListener( 'click', Remove_a_Loan );

    let Update_Loan_Button = document.getElementById( 'Update_Loan_Button' );
    Update_Loan_Button.addEventListener( 'click', Update_Loan_Settings );

    const Server = document.body.querySelector( 'footer' ).querySelector( 'div' );
    const Dataworkz_Client = Server.querySelectorAll( 'button' );

    Dataworkz_Client[ 0 ].addEventListener( 'click', Save_Game );
    Dataworkz_Client[ 1 ].addEventListener( 'click', Update_Game_Data );

    let Fund_button = document.getElementById( 'Fund' );
    Fund_button.addEventListener( 'click', Fund );

    let Add_Property_button = document.getElementById( 'Add_Property' );
    Add_Property_button.addEventListener( 'click', Add_Property );

    let Edit_Last_Location_Btn = document.getElementById( 'Edit_Last_Location_Btn' );
    Edit_Last_Location_Btn.addEventListener( 'click', Edit_Last_Location );

    let Delete_Property_button = document.getElementById( 'Delete_Property' );
    Delete_Property_button.addEventListener( 'click', Delete_Property );

};

function Update_Game_Data() {

    const Registry = sessionStorage.getItem( '<disconnect>' );
    const Overall_Data = Collect_All_Data();

    var Game = JSON.parse( localStorage.getItem( 'Game' ) );

    Game.Code[ Registry ].Data.Accounts = Overall_Data[ 0 ];
    Game.Code[ Registry ].Data.loans = Overall_Data[ 1 ];

    var connect = Game.Code[ Registry ].Data;
    connect = JSON.stringify( connect );
    sessionStorage.setItem( '<connect>', connect );

    Game = JSON.stringify( Game );
    localStorage.setItem( 'Game', Game );

    return alert( 'Your Currently Saved Game Data has been Updated...!!!' );

};

function Update_Account_Details() {

    let Name = document.getElementById( 'Update_Name' );
    let Amount = document.getElementById( 'Update_Amount' );
    let Interest = document.getElementById( 'Update_Interest' );

    const Accounts = List_Accounts_Names( true );

    var Does_Contains = false;
    var Update_passkey = -1;

    for ( var a = 0; a < Accounts.length; a++ ) {
        
        if ( Name.value == Accounts[ a ].textContent ) {
            
            Does_Contains = true; Update_passkey = a; a = Accounts.length;
        
        };

    }; if ( ! ( Does_Contains ) ) { return alert( 'The Name does not Exists...!!!' ); };

    const Client = List_Accounts_Names( false );

    const Demand = Seperate_Percentage( Client[ Update_passkey ][ 2 ].innerHTML );

    const Total_Demand = parseFloat( Demand ) + parseFloat( Interest.value );

    if ( Total_Demand >= 50 || Total_Demand < 0 ) {

        return alert( 'Sorry ! But you are not in the Interest Demand range...' );

    }; Client[ Update_passkey ][ 1 ].innerHTML =
    parseFloat( Client[ Update_passkey ][ 1 ].innerHTML )
    + parseFloat( Amount.value );

    Client[ Update_passkey ][ 2 ].innerHTML = Total_Demand + ' %';

    Name.value = '';
    Amount.value = '';
    Interest.value = '';

    return alert( 'Account Updated ❗ ' );

};

function List_Purposes() {

    let Purpose_Selector = document.getElementById( 'purpose' );

    Purpose_Selector.innerHTML = '';

    var default_option = document.createElement( 'option' );
    default_option.textContent = '';

    Purpose_Selector.appendChild( default_option );

    var default_option = document.createElement( 'option' );
    default_option.textContent = 'Bank';

    Purpose_Selector.appendChild( default_option );

    const Accounts = List_Accounts_Names( true );

    var Purposes = null;

    for ( var a = 0; a < Accounts.length; a++ ) {

        Purposes = document.createElement( 'option' );
        Purposes.textContent = Accounts[ a ].textContent;
        Purpose_Selector.appendChild( Purposes );

    }; return true;

};

function List_Accounts_Names( type_bollean ) {

    let Accounts_Table = document.getElementById( 'Accounts_Table' );

    Accounts_Table = Accounts_Table.querySelectorAll( 'tr' );
    let Accounts = new Array();

    for ( var b = 1; b < Accounts_Table.length; b++ ) {

        if ( type_bollean ) { Accounts.push( Accounts_Table[ b ].querySelector( 'td' ) ); }
        else { Accounts.push( Accounts_Table[ b ].querySelectorAll( 'td' ) ); };
    
    }; return Accounts;

};

function Data() {

    let name = document.getElementById( 'name' );
    name = name.value;

    let purpose = document.getElementById( 'purpose' );
    purpose = purpose.value;

    let amount = document.getElementById( 'amount' );
    amount = amount.value;

    if ( name == '' ) { Warning( 'Name' ); }
    else if ( purpose == '' ) { Warning( 'Purpose' ); }
    else if ( amount == '' ) { Warning( 'Amount' ); }
    else if ( amount <= 0 ) { return alert( 'Amount cannot be less than or equal to Zero ( 0 )...!!!' ); }
    else { Add_Account( name, purpose, amount ); };

};

function Add_Account( name, purpose, amount ) {

    var Percent = Bank_Interest_Demand;

    if ( purpose != 'Bank' ) {

        const Account = List_Accounts_Names( false );

        var Does_Loan_Provider_Exists = false;
        var Loan_Provider_Number = -1;

        for ( var c = 0; c < Account.length; c++ ) {

            if ( Account[ c ][ 0 ].innerHTML == purpose ) {
                
                Does_Loan_Provider_Exists = true;

                Loan_Provider_Number = c;

                c = Account.length;

            };

        }; if ( ! ( Does_Loan_Provider_Exists ) ) {

            return alert( 'Sorry ! This Loan Provider has commited Suicide...' );

        }; Percent = parseFloat( Seperate_Percentage( Account[ Loan_Provider_Number ][ 2 ].innerHTML ) );

    }; amount = parseFloat( amount );

    const Accounts = List_Accounts_Names( true );
    var Does_Contains = false;

    for ( var a = 0; a < Accounts.length; a++ ) {
        
        if ( name == Accounts[ a ].textContent ) { Does_Contains = true; a = Accounts.length; };

    }; if ( ! ( Does_Contains ) ) { return alert( 'The Name does not Exists...!!!' ); };

    var Interest_per_round = Calculate_Simple_Interest( amount, Percent, 0 );

    let table = document.getElementById( 'Data' );
    let row = document.createElement( 'tr' );

    let name_data = document.createElement( 'td' );
    name_data.textContent = name;

    let purpose_data = document.createElement( 'td' );
    purpose_data.textContent = purpose;

    let amount_data = document.createElement( 'td' );
    amount_data.textContent = amount;

    let rounds_data = document.createElement( 'td' );
    rounds_data.textContent = 0;

    let Interest = document.createElement( 'td' );
    Interest.textContent = Interest_per_round;

    let Total = document.createElement( 'td' );
    Total.textContent = parseFloat( amount ) + parseFloat( Interest_per_round );

    row.appendChild( name_data );
    row.appendChild( purpose_data );
    row.appendChild( amount_data );
    row.appendChild( Interest );
    row.appendChild( rounds_data );
    row.appendChild( Total );

    table.appendChild( row );

    let hd_name = document.getElementById( 'name' );
    let hd_purpose = document.getElementById( 'purpose' );
    let hd_amount = document.getElementById( 'amount' );

    hd_name.value = '';
    hd_amount.value = '';
    hd_purpose.value = '';

};

function Add_New_Account() {

    let Name = document.getElementById( 'Name_Account' );
    let Balance = document.getElementById( 'Starting_Balance' );
    let Interest_Demand = document.getElementById( 'Interest_Demand' );

    Name = Name.value;
    Balance = Balance.value;
    Interest_Demand = Interest_Demand.value;

    switch ( '' ) {

        case Name: return Warning( 'Name' );
        case Balance: return Warning( 'Starting Balance' );
        case Interest_Demand: return Warning( 'Your Interest Demand' );
        
        default: return Check_Numbers();

    }; function Check_Numbers() {

        if ( Balance < 0 ) { return alert( 'Balance cannot be less than 0 ( Zero )...!!!' ); }

        else if ( Interest_Demand < 0 ) {

            return alert( 'Interest Demand cannot be less than 0 ( Zero ) Percent...!!!' );

        } else if ( Interest_Demand >= 50 ) {

            return alert( 'Interest Demand cannot be more than or equal to 50%...!!!' );

        } else { Add_Data( Name, Balance, Interest_Demand ); };

    }; function Add_Data( name, balance, interest_demand ) {

        // For Accounts Table 👇

        let Accounts_Table = document.getElementById( 'Accounts_Table' );
        let new_account = document.createElement( 'tr' );

        let account_name = document.createElement( 'td' );
        let account_balance = document.createElement( 'td' );
        let account_interest_demand = document.createElement( 'td' );

        account_name.textContent = name;
        account_balance.textContent = balance;
        account_interest_demand.textContent = interest_demand + ' %';

        new_account.appendChild( account_name );
        new_account.appendChild( account_balance );
        new_account.appendChild( account_interest_demand );

        Accounts_Table.appendChild( new_account );

        // For Properties Table 👇

        let Properties_Table = document.getElementById( 'Properties_Table' );
        let new_row = document.createElement( 'tr' );
        let new_data_one = document.createElement( 'td' );
        let new_data_two = document.createElement( 'td' );

        new_data_one.innerHTML = name;
        new_data_two.innerHTML = 'No Properties Yet';

        new_row.appendChild( new_data_one );
        new_row.appendChild( new_data_two );

        Properties_Table.appendChild( new_row );

        // For Location Table 👇

        let Location_Table = document.getElementById( 'Location_Table' );
        new_row = document.createElement( 'tr' );
        new_data_one = document.createElement( 'td' );
        new_data_two = document.createElement( 'td' );

        new_data_one.innerHTML = name;
        new_data_two.innerHTML = '?';

        new_row.appendChild( new_data_one );
        new_row.appendChild( new_data_two );

        Location_Table.appendChild( new_row );

        Conclude();

    }; function Conclude() {

        let Name = document.getElementById( 'Name_Account' );
        let Balance = document.getElementById( 'Starting_Balance' );
        let Interest_Demand = document.getElementById( 'Interest_Demand' );

        Name.value = '';
        Balance.value = '';
        Interest_Demand.value = '';

    }; return true;

};

function Seperate_Percentage( whole ) {

    var only_number = '';

    for ( var a = 0; a < whole.length - 2; a++ ) { only_number += whole.charAt( a ); };

    only_number = parseFloat( only_number );

    return only_number;

};

function Add_Member_Round() {

    let Name = document.getElementById( 'Update_Name++' );
    const Names = List_Accounts_Names( true );

    var Exists = false;
    var Account_Number = -1;
    
    for ( var a = 0; a < Names.length; a++ ) {

        if ( Name.value == Names[ a ].innerHTML ) { Exists = true; Account_Number = a; a = Names.length; };

    }; if ( ! ( Exists ) ) { return alert( 'The Name does not Exists...!!!' ); };

    const Loans = List_Loans( true );
    var Have_Loan = false;
    var Loan_Number = -1;

    for ( var b = 0; b < Loans.length; b++ ) {

        if ( Name.value == Loans[ b ][ 0 ].innerHTML ) {
            
            Have_Loan = true; Loan_Number = b; b = Loans.length;
        
        };

    }; const Account = List_Accounts_Names( false );

    Account[ Account_Number ][ 1 ].innerHTML = parseFloat( Account[ Account_Number ][ 1 ].innerHTML )
    + Every_Round_Money;

    if ( Have_Loan ) {

        const Amount = Loans[ Loan_Number ][ 2 ].innerHTML;
        const Purpose = Loans[ Loan_Number ][ 1 ].innerHTML;

        var Interest = 0;

        if ( Purpose == 'Bank' ) { Interest = Bank_Interest_Demand; } else {

            var Does_Loan_Provider_Exists = false;
            var Loan_Provider_Number = -1;

            for ( var c = 0; c < Account.length; c++ ) {

                if ( Account[ c ][ 0 ].innerHTML == Purpose ) {
                    
                    Does_Loan_Provider_Exists = true;

                    Loan_Provider_Number = c;

                    c = Account.length;

                };

            }; if ( ! ( Does_Loan_Provider_Exists ) ) {

                return alert( 'Sorry ! Your Loan Provider does not Exists any more...' );

            }; const Loan_Provider_Interest_Demand =
            parseFloat( Seperate_Percentage( Account[ Loan_Provider_Number ][ 2 ].innerHTML ) );

            const Time = parseFloat( Loans[ Loan_Number ][ 4 ].innerHTML );

            Interest = Calculate_Simple_Interest( Amount, Loan_Provider_Interest_Demand, Time );

        }; Loans[ Loan_Number ][ 3 ].innerHTML = Interest;

        Loans[ Loan_Number ][ 4 ].innerHTML = parseFloat( Loans[ Loan_Number ][ 4 ].innerHTML ) + 1;

        Loans[ Loan_Number ][ 5 ].innerHTML = parseFloat( Loans[ Loan_Number ][ 2 ].innerHTML ) +
        parseFloat( Loans[ Loan_Number ][ 3 ].innerHTML );

    }; Name.value = ''; return alert( 'One Round added to the Member Specified...' );

};

function List_Loans( type_bollean ) {

    let Loans_Table = document.getElementById( 'Data' );
    Loans_Table = Loans_Table.querySelectorAll( 'tr' );

    var Data = new Array();

    if ( ! ( type_bollean ) ) {

        for ( var b = 1; b < Loans_Table.length; b++ ) { Data.push( Loans_Table[ b ] ); };

        return Data;

    };

    for ( var a = 1; a < Loans_Table.length; a++ ) {
        
        Data.push( Loans_Table[ a ].querySelectorAll( 'td' ) );
    
    }; return Data;

};

function Remove_a_Loan() {

    let Loan_Name = document.getElementById( 'Loan_Name' );
    let Loan_Purpose = document.getElementById( 'Loan_Purpose' );

    const Loans = List_Loans( true );
    var Exists = false;
    var Loan_Number = -1;

    for ( var a = 0; a < Loans.length; a++ ) {

        if ( ( Loans[ a ][ 0 ].innerHTML == Loan_Name.value )
        && ( Loans[ a ][ 1 ].innerHTML == Loan_Purpose.value ) )

        { Exists = true; Loan_Number = a; a = Loans.length; };

    }; if ( ! ( Exists ) ) { return alert( 'The Loan you Specified does not Exists...' ); };

    const Rows = List_Loans( false ); Rows[ Loan_Number ].remove();
    Loan_Name.value = ''; Loan_Purpose.value = '';
    return alert( 'Your Specified Loan Removed...' );

};

function Update_Loan_Settings() {

    let Name = document.getElementById( 'Loan_Name++' );
    let Purpose = document.getElementById( 'Loan_Purpose++' );
    let Amount = document.getElementById( 'Amount_to_change' );

    const Amount_to_Change = Amount.value;
    const Loans = List_Loans( true );

    switch ( '' ) {

        case Name.value: return Warning( "Loaned Member Name" );
        case Purpose.value: return Warning( "Loaned Member Purpose" );
        case Amount.value: return Warning( "Loaned Member Amount to be Changed" );
    
        default: Check_Consistancy( Name, Purpose ); break;

    }; function Check_Consistancy( Name, Purpose ) {

        var Consistancy_Value = false;
        var Value_of_Consistancy = -1;

        for ( var a = 0; a < Loans.length; a++ ) {

            if ( ( Loans[ a ][ 0 ].innerHTML == Name.value )
            && ( Loans[ a ][ 1 ].innerHTML == Purpose.value ) )

            { Consistancy_Value = true; Value_of_Consistancy = a; a = Loans.length; };

        }; if ( ! ( Consistancy_Value ) ) { return alert( 'The Loan you Specified does not Exists...' ); };

        Loans[ Value_of_Consistancy ][ 2 ].innerHTML =
        parseFloat( Loans[ Value_of_Consistancy ][ 2 ].innerHTML ) + parseFloat( Amount_to_Change );

        Name.value = ''; Purpose.value = ''; Amount.value = ''; Edit_Simple_Interest( Value_of_Consistancy );

    }; function Edit_Simple_Interest( Number ) {

        const Loan_Provider = Loans[ Number ][ 1 ].innerHTML;
        var LPID = 0;

        if ( Loan_Provider == 'Bank' ) { LPID = Bank_Interest_Demand; } else {

            const Account = List_Accounts_Names( false );
            var LPN = -1;

            for ( var a = 0; a < Account.length; a++ ) {

                if ( Account[ a ][ 0 ].innerHTML == Loan_Provider )
                
                { LPN = a; a = Account.length; };

            }; if ( LPN == -1 ) { return alert( 'Sorry ! Your Loan Provider does not Exists any more...' ); };
    
            LPID = parseFloat( Seperate_Percentage( Account[ LPN ][ 2 ].innerHTML ) );

        }; const Amount = parseFloat( Loans[ Number ][ 2 ].innerHTML );
        const Time = parseFloat( Loans[ Number ][ 4 ].innerHTML );
        
        Loans[ Number ][ 3 ].innerHTML = Calculate_Simple_Interest( Amount, LPID, Time );

        Loans[ Number ][ 5 ].innerHTML = Amount + parseFloat( Loans[ Number ][ 3 ].innerHTML );
        
        return alert( 'The Specified Loan updated with the specified Amount...' );

    };

};

function Calculate_Simple_Interest( Principal, Rate_of_Interest, Time ) {
    
    return ( Principal * ( Rate_of_Interest / 100 ) * Time );

};

function Collect_All_Data() {

    const Accounts = List_Accounts_Names( false );
    const Loans = List_Loans( true );

    var Save_Accounts = new Array();
    var Save_Loans = new Array();

    var Current_Account = new Array();
    var Current_Loan = new Array();

    for ( var a = 0; a < Accounts.length; a++ ) {

        Current_Account = new Array();

        for ( var b = 0; b < Accounts[ a ].length; b++ ) {

            Current_Account.push( Accounts[ a ][ b ].innerHTML );

        }; Save_Accounts.push( Current_Account );

    }; for ( var c = 0; c < Loans.length; c++ ) {

        Current_Loan = new Array();

        for ( var d = 0; d < Loans[ c ].length; d++ ) {

            Current_Loan.push( Loans[ c ][ d ].innerHTML );

        }; Save_Loans.push( Current_Loan );

    }; var Overall_Data = new Array();

    Overall_Data.push( Save_Accounts );
    Overall_Data.push( Save_Loans );

    return Overall_Data;

};

function Save_Game() {
    
    const Overall_Data = Collect_All_Data(); Save_As();

    function Save_As() {

        const Game = JSON.parse( localStorage.getItem( 'Game' ) );

        const Game_Code = prompt( 'Your New and Unique Game Code Is ? ' );

        if ( Game_Code == '' || Game_Code == null ) {

            alert( 'Please Create your New Game Code as to Save the Current Game...!!!' );
            
            Save_As();

        } else if ( Object.keys( Game.Code ).indexOf( Game_Code ) == -1 ) { Create_Game_PIN( Game_Code ); }
        
        else {

            alert( 'This Game Code is not Unique i.e.. Already in Use ! Please Try with another one...' );

            Save_As();

        };

    }; function Create_Game_PIN( Game_Code ) {

        const Game_PIN = prompt( 'Your New Game Code PIN ? ' );

        if ( parseFloat( Game_PIN ).toString().length == 4 ) {

            if ( Game_PIN.includes( '.' ) ) {

                alert( 'Game PIN Cannot be in Decimal ! ' ); Create_Game_PIN( Game_Code );

            } else { Create_Game_Data( Game_Code, Game_PIN ); };

        } else {

            alert( 'Your Game PIN must be of 4 digits...' ); Create_Game_PIN( Game_Code );

        };

    }; function Create_Game_Data( Game_Code, Game_PIN ) {

        var Game = JSON.parse( localStorage.getItem( 'Game' ) );

        Game.Code[ Game_Code ] = new Object();
        Game.Code[ Game_Code ].PIN = parseFloat( Game_PIN );
        Game.Code[ Game_Code ].Data = new Object();
        Game.Code[ Game_Code ].Data.loans = Overall_Data[ 1 ];
        Game.Code[ Game_Code ].Data.Accounts = Overall_Data[ 0 ];

        Game = JSON.stringify( Game );
        localStorage.setItem( 'Game', Game );

        alert( 'Your Game Successfully Saved to the Server...!!!' );

        return location.href = '../Connection/Connect.html';

    };

};

function Fund() {

    let Funder = document.getElementById( 'Funder' );
    let Funder_Value = document.getElementById( 'Funder_Value' );

    const Accounts = List_Accounts_Names( true );
    var does_exists = false; var existance;

    for ( var a = 0; a < Accounts.length; a++ ) {

        if ( Accounts[ a ].innerHTML == Funder.value ) {

            does_exists = true; existance = a; a = Accounts.length;

        };

    }; if ( ! ( does_exists ) ) { return alert( 'The Funder does not exists...' ); };

    const Account = List_Accounts_Names( false );

    const Funding = ( ( Accounts.length - 1 ) * parseFloat( Funder_Value.value ) );

    if ( ! ( parseFloat( Account[ existance ][ 1 ].innerHTML ) >= Funding ) ) {

        return alert( 'The Funder has lesser Balance than given Funding Value...' );

    };
    
    Account[ existance ][ 1 ].innerHTML = parseFloat( Account[ existance ][ 1 ].innerHTML ) - Funding;

    for ( var b = 0; b < Accounts.length; b++ ) {

        if ( ! ( b == existance ) ) {

            Account[ b ][ 1 ].innerHTML =
            parseFloat( Account[ b ][ 1 ].innerHTML ) + parseFloat( Funder_Value.value );

        };
        
    };
    
    if ( parseFloat( Funder_Value.value ) > 999 ) { return MarketPlace_Funds(); }
    else { return Conclution(); };
    
    function Conclution() {

        Funder.value = ''; Funder_Value.value = '';
    
        return alert( 'The Amount Funded in the Share Market...' );

    }; function MarketPlace_Funds() {

        let Stop_Market = document.getElementById( 'Stop_Market' );

        Bank_Interest_Demand = ( parseFloat( Funder_Value.value ) ) / 1000;

        Stop_Market.innerHTML = " Current Stop Market's Bank Interest Rate is : "
        + Bank_Interest_Demand + " % ";

        return Conclution();

    };

};

function Add_Property() {

    let Property_Member_Name = document.getElementById( 'Property_Member_Name' );
    let Property_Name = document.getElementById( 'Property_Name' );

    let Properties_Table = document.getElementById( 'Properties_Table' );

    let rows = Properties_Table.getElementsByTagName("tr");

    let found = false;

    for (let i = 1; i < rows.length; i++) {

        let nameCell = rows[i].getElementsByTagName("td")[0]; // Column A
        let propCell = rows[i].getElementsByTagName("td")[1]; // Column B

        if (nameCell && nameCell.innerText === Property_Member_Name.value) {
        let currentValue = propCell.innerText.trim();

        if (currentValue.includes(",")) {

            // Prepend property to existing value
            propCell.innerText = Property_Name.value + ", " + currentValue;

        } else {
            // Replace value with property + comma
            propCell.innerText = Property_Name.value + ",";
        }

        found = true; break;

        }
    }

    if (found) { alert( 'The Property with the Owner is Created...' ); }
    else { alert("Member with the name " + String( Property_Member_Name.value ) + " not found!"); }

};

function Delete_Property() {

    let Property_Member_Name = document.getElementById( 'Property_Member_Name_2' );
    let Property_Name = document.getElementById( 'Property_Name_2' );

    let Properties_Table = document.getElementById( 'Properties_Table' );

    let rows = Properties_Table.getElementsByTagName("tr");

    let found = false;

    for (let i = 1; i < rows.length; i++) {
        
        let nameCell = rows[i].getElementsByTagName("td")[0]; // Name column
        let propCell = rows[i].getElementsByTagName("td")[1]; // Properties column

        if (nameCell && nameCell.innerText === Property_Member_Name.value ) {

            found = true;

            let currentValue = propCell.innerText.trim();

            // If already "No Properties Yet", nothing to delete

            if (currentValue === "No Properties Yet") {

                alert("No properties to delete for this member!");
                return;
            };

            // Split into array, trim spaces

            let propertiesArray = currentValue.split(",").map(p => p.trim());

            // Remove property if exists

            let updatedArray = propertiesArray.filter(p => p !== Property_Name.value);

            if (updatedArray.length === propertiesArray.length) {

                alert("Property not found for this member!");
                return;

            }

            // If no properties left, show default message

            if (updatedArray.length === 0) {

                propCell.innerText = "No Properties Yet";

            } else {

                propCell.innerText = updatedArray.join(", ");

            };

            alert("Property deleted successfully!"); break;

        };

    };

    if (!found) { alert("Member with the name " + String( Property_Member_Name.value ) + " not found!"); }

};

function Edit_Last_Location() {

    let Member_name = document.getElementById( 'Last_Location_Member_Name' );
    let Last_Location = document.getElementById( 'Edit_Last_Location' );
    let Location_Table = document.getElementById( 'Location_Table' );

    let rows = Location_Table.getElementsByTagName("tr");

    let found = false;

    // Loop through rows starting from index 1 (to skip header row)

    for (let i = 1; i < rows.length; i++) {

        let nameCell = rows[i].getElementsByTagName("td")[0]; // Name column
        let locationCell = rows[i].getElementsByTagName("td")[1]; // Last location column

        if (nameCell && nameCell.innerText === Member_name.value) {

            locationCell.innerText = Last_Location.value;  // Update location
            found = true; break;

        };

    }

    // Show alert

    if (found) { alert("Last Location Updated successfully !");
    } else { alert("Member with the name " + String( Member_name.value ) + " not found!"); }

};

function Warning( type ) { return alert( 'Please Fill Out the ' + type + '...!!!' ); };