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
const data = generateData(20);

function getList() {
    return fetch('http://usd-volockoy1:8000/notes/', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(result => {
        return result.json();    
    })
}

export { data, getList }
