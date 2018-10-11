import dateFormat from 'dateformat';
import config from '../config';
export const getAllUnit=()=> {
  

    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }
    
      var api_url = `${config.API_URL}`;
      fetch(api_url + '/vendor/getUnits', object)
        .then(res => res.json())
        .then(json => {

          var pushunits=[];

          json.map(function(itemUnit,index) {
            pushunits.push({value: itemUnit.name, label: itemUnit.name});
            
          });
           console.log("there are the listing for this",pushunits)
          return pushunits;
        

        }).catch(error => {
          
        });
    
  }
  export const PAGELIMIT = 10;

  export const yeardetails = (year) => {
    var accourding = 0;

    var days31 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    var days30 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    var days29 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
    var days28 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
    var weeks = {
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
      7: "Sun"
    };

    var rowsofmonth = [1, 2, 3, 4, 5, 6];


    accourding = (year % 4 == 0 && !(year % 100 == 0)) ? days29 : days28;//leap year

    var months = {
      1: {
        name: "January",
        month: 1,
        days: days31,
        week: dateFormat(year + "-01-01", "N"),
        rowsofmonth: rowsofmonth
      },
      2: {
        name: "February",
        month: 2,
        days: accourding,
        week: dateFormat(year + "-02-01", "N"),
        rowsofmonth: rowsofmonth
      },
      3: {
        name: "March",
        month: 3,
        days: days31,
        week: dateFormat(year + "-03-01", "N"),
        rowsofmonth: rowsofmonth
      },
      4: {
        name: "April",
        month: 4,
        days: days30,
        week: dateFormat(year + "-04-01", "N"),
        rowsofmonth: rowsofmonth
      },
      5: {
        name: "May",
        month: 5,
        days: days31,
        week: dateFormat(year + "-05-01", "N"),
        rowsofmonth: rowsofmonth
      },
      6: {
        name: "June",
        month: 6,
        days: days30,
        week: dateFormat(year + "-06-01", "N"),
        rowsofmonth: rowsofmonth
      },
      7: {
        name: "July",
        month: 7,
        days: days31,
        week: dateFormat(year + "-07-01", "N"),
        rowsofmonth: rowsofmonth
      },
      8: {
        name: "August",
        month: 8,
        days: days31,
        week: dateFormat(year + "-08-01", "N"),
        rowsofmonth: rowsofmonth
      },
      9: {
        name: "September",
        month: 9,
        days: days30,
        week: dateFormat(year + "-09-01", "N"),
        rowsofmonth: rowsofmonth
      },
      10: {
        name: "October",
        month: 10,
        days: days31,
        week: dateFormat(year + "-10-01", "N"),
        rowsofmonth: rowsofmonth
      },
      11: {
        name: "November",
        month: 11,
        days: days30,
        week: dateFormat(year + "-11-01", "N"),
        rowsofmonth: rowsofmonth
      },
      12: {
        name: "December",
        month: 12,
        days: days31,
        week: dateFormat(year + "-12-01", "N"),
        rowsofmonth: rowsofmonth
      }
    };
    return months;
  }


