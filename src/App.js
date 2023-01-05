import {React, useState, useEffect,useRef} from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
   // const [rates, setRates] = useState({});
    const ratesRef = useRef({});

    const [fromCurrency, setFromCurrrency] = useState('RUB');
    const [toCurrency, setToCurrrency] = useState('USD');
    const [fromPrice, setFromPrice] = useState(0);
    const [toPrice, setToPrice] = useState(0);

    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then((res) => res.json())
            .then((json) => {
              ratesRef.current = json.Valute;
              onChangeToPrice(1);
              console.log(json.Valute);
            })
            .catch((err) => {
                console.warn(err);
                alert('Не удалось получить информацию')
            })
    }, []);

    const onChangeFromPrice = (value) => {
        const price = value / ratesRef.current[fromCurrency];
        /*aystex unem xndir "AUD":  47.6537,
         "AUD": {
            "ID": "R01010",
            "NumCode": "036",
            "CharCode": "AUD",
            "Nominal": 1,
            "Name": "Австралийский доллар",
            "Value": 47.6537,
            "Previous": 48.5922
        },*/
        const result = price * ratesRef.current[toCurrency];  // ? nuyn@
        setToPrice(result);
        setFromPrice(value);
    };

    const onChangeToPrice = (value) => {
        const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;  // ? nuyn@
        setFromPrice(result);
        setToPrice(value);
    };

    useEffect(() => {
        onChangeFromPrice(fromPrice);
    }, [fromCurrency, fromPrice]);

    useEffect(() => {
        onChangeToPrice(toPrice);
    }, [toCurrency, toPrice]);



  return (
    <div className="App">
      <Block
          value={fromPrice}
          currency={fromCurrency}
          onChangeCurrency={setFromCurrrency}
          onChangeValue={onChangeFromPrice}
      />
      <Block
          value={toPrice}
          currency={toCurrency}
          onChangeCurrency={setToCurrrency}
          onChangeValue={onChangeToPrice}
      />

    </div>
  );
}

/*https://cdn.cur.su/api/latest.json*/
/*https://www.cbr-xml-daily.ru/daily_json.js*/

export default App;
