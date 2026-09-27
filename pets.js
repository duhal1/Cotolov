const key = 'eca64a7e-fa6a-44c8-a2dc-dfd7c1d211dd'
const tileURL = `https://tiles.api-maps.yandex.ru/v1/tiles/?x={x}&y={y}&z={z}&lang=ru_RU&l=map&projection=web_mercator&apikey=${key}`;


let pets = [
    {   id: 1,
        status: 'lost',
        type: 'cat',
        title: 'Британец',
        description: 'добрый кот, серогоцвета откликается на кличку Мустафа',
        contact: '+7 (999) 123-45 67',
        district: 'Пр. Победы 15',
        coords: [46.949824, 142.753456]},
    {   id: 1,
        status: 'found',
        type: 'dog',
        title: 'Шпиц',
        description: 'Маленькая собачка коричневого цветва ',
        contact: '+7 (942) 67 52 69',
        district: 'Пр. Победы 15',
        coords: [46.936596, 142.751812]}

]