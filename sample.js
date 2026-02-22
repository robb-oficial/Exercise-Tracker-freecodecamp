const dates = [
    {
        id: 1,
        date: new Date("2010-02-05")
    },
    {
        id: 2,
        date: new Date("2011-02-05")
    },
    {
        id: 3,
        date: new Date("2012-02-05")
    },
    {
        id: 4,
        date: new Date("2012-02-05")
    },
    {
        id: 5,
        date: new Date("2012-02-05")
    },
];
const limit = 4;
const newDates = dates.slice(0,limit);
console.log(dates);
console.log(newDates);

// const dateFrom = new Date("2011-01-01");
// const dateTo = new Date("2021-01-01");

// dates.forEach((el) => {
//     if (el.date >= dateFrom && el.date <= dateTo) {
//         console.log(el);
//     }
// });
// const filteredDates = dates.filter((el) => el.date >= dateFrom && el.date <= dateTo);
// console.log('filteredDates');
// console.log(filteredDates);
