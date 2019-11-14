function generateData(count) {
    let result = [];
    for (let i = 1; i < count + 1; i++) {
        result.push({
            _id: i.toString(),
            name: 'Point N - ' + i
        })
    }
    return result;
}
const data = generateData(0);

function getList() {
    return fetch('https://tensorhack.herokuapp.com/notes', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(result => {
        return result.json();    
    }).catch(error => {
        return data;
    })
}

export { data, getList }
