const dataSource = {
    list: null,

    getList: () => {
        if (!this.list) {
            this.list = generateData(7);
        }
        return this.list;
    },

    addItem: (item) => {
        item._id = Math.random().toString(12);
        const newList = [item, ...this.list];
        this.list = newList;
        return this.list;
    },

    deleteItem: (id) => {
        const newList = [];

        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i]._id != id) {
                newList.push(this.list[i]);
            }
        }

        this.list = newList;

        return newList;
    }
}
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

export {dataSource};
/*function getList() {
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
}*/
