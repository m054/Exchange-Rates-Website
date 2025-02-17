import React from "react";
import { MenuItem } from "@material-ui/core";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ExchangeRatesTable } from "./exchangeRatesTable";
import './exchangeRates.css';
import { BorderBottom } from "@mui/icons-material";



export const ExchangeRates: React.FC = () => {

    const [arr, setArr] = React.useState([]);
    //Retrieving a list of coins from the server
    React.useEffect(() => {
        fetch('https://localhost:7203/api/ExchangeRatse/GetAll')
            .then(response => response.json())
            .then(data => setArr(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const style1 = { width: '15vw', height: '50px',border: '3px solid black',};
     const style2 = { backgroundColor: 'white', borderBlockEnd: '1px solid white',borderBottom: '1px solid gray'};



    const [Currency, setCurrency] = React.useState('');
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = { PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 150 } } };

    const handleChangeCurrency = (event: SelectChangeEvent) => {
        setCurrency(event.target.value);
    };

    return (

        //Displaying the list in a dropdown control
        <div className="exchangeRatse">
            <h1>Exchange Rates</h1>
            <Select
                value={Currency}
                onChange={handleChangeCurrency}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                style={style1}
                MenuProps={MenuProps}
                variant='outlined'
                color='secondary' 
                
                >
                {arr.map((element: any) =>
                    <MenuItem value={element} style={style2}>{element}</MenuItem>
                )}
            </Select>
            <div className="table">{Currency !== '' && <ExchangeRatesTable selectedCurrency={Currency} />}</div>
        </div>

    );
}