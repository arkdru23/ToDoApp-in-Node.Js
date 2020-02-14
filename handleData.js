const colors = require('colors')
const fs = require('fs')

const handleData = (type, title) => {
    const data = fs.readFileSync('data.json');
    // let data = fs.readFileSync('data.json');
    // data = data.toString()
    let tasks = JSON.parse(data)

    if (type === 1 || type === 2) {
        const isExisted = tasks.find(task => task.title === title) ? true : false;
        if (type === 1 && isExisted) {
            return console.log("takie zadanie juz istneje".red)
        } else if (type === 2 && !isExisted) {
            return console.log('nie moge usunac zadania, ktore nie istnieje '.red)
        }
    }


    let dataJSON = ''
    switch (type) {
        case 1:
            tasks = tasks.map((task, index) => ({ id: index + 1, title: task.title }))
            const id = tasks.length + 1
            tasks.push({ id, title })
            dataJSON = JSON.stringify(tasks)
            fs.writeFileSync('data.json', dataJSON)
            console.log(`dodaje zadanie : ${title}`.white.bgGreen)
            break;
        case 2:
            const index = tasks.findIndex(task => task.title === title)
            tasks.splice(index, 1)
            tasks = tasks.map((task, index) => ({ id: index + 1, title: task.title }))
            dataJSON = JSON.stringify(tasks)
            fs.writeFile('data.json', dataJSON, 'utf8', (err) => {
                if (err) throw err;
                console.log(`Zadanie ${title} zostało usuniete`.white.bgGreen)
            })
            break;
        case 3:
            console.log(`lista zadan do zrobienia obejmuje ${tasks.length} pozycji. Do zrobienia masz:`);
            if (tasks.length) {
                tasks.forEach((task, index) => {
                    if (index % 2) {
                        console.log(task.title.green)
                    }
                    return console.log(task.title.yellow)
                })
            }
            break;
    }

}

module.exports = handleData