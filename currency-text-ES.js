var currencyText = (function() {
    'use strict';

    var units = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'],
        tens1 = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECI'],
        tens2 = ['VEINTE', 'VEINTI'],
        tens3 = ['TREINTA ', 'CUARENTA ', 'CINCUENTA ', 'SESENTA ', 'SETENTA ', 'OCHENTA ', 'NOVENTA '],
        hundreds = ['CIEN', 'CIENTO ', 'DOSCIENTOS ', 'TRESCIENTOS ', 'CUATROCIENTOS ', 'QUINIENTOS ', 'SEISCIENTOS ', 'SETECIENTOS ', 'OCHOCIENTOS ', 'NOVECIENTOS '];

    function Units(num) {
        return units[num];
    }

    function TensY(strSin, numUnits) {
        if (numUnits > 0) {
            return strSin + 'Y ' + Units(numUnits);
        }
    
        return strSin;
    }

    function Tens(num){
        var ten = Math.floor(num/10),
            unit = num - (ten * 10);

        if (ten === 0) {
            return Units(unit);
        } else if (ten === 1) {
            if (unit > 5) {
                return tens1[unit] + Units(unit);
            }

            return tens1[unit];
        } else if (ten === 2) {
            if (unit === 0) {
                return tens2[unit];
            }

            return tens2[ten - 1] + Units(unit);
        } else {
            return TensY(tens3[ten - 3], unit);
        }
    }

    function Hundreds(num) {
        var hundred = Math.floor(num/100),
            ten = num - (hundred * 100);

        if (hundred === 0) {
            return Tens(ten);
        } else if (hundred === 1 && ten === 0) {
            return hundreds[ten];
        } else {
            return hundreds[hundred] + Tens(ten);
        }
    }

    function thousands(num) {
        var thousands = Math.floor(num/1000),
            hundred = num - (thousands * 1000);

        if (thousands === 0) {
            return Hundreds(hundred);
        }

        if (thousands === 1) {
            return 'UN MIL ' + Hundreds(hundred);
        }

        return Hundreds(thousands) + ' MIL ' + Hundreds(hundred);
    }

    function numText(num) {
        var data = {
            ints: Math.floor(num),
            cents: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            stringcents: '',
            stringCurrencyPlural: 'PESOS',
            stringCurrencySingular: 'PESO'
        };

        data.stringcents = 'CON ' + data.cents + '/100';

        if(data.ints === 0) {
            return 'CERO ' + data.stringCurrencyPlural + ' ' + data.stringcents;
        }
        if (data.ints === 1) {
            return thousands(data.ints) + ' ' + data.stringCurrencySingular + ' ' + data.stringcents;
        } else {
            return thousands(data.ints) + ' ' + data.stringCurrencyPlural + ' ' + data.stringcents;
        }
    }

    return numText;
})(currencyText);
