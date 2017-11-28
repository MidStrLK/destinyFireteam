/**
 * Created by eds on 22.11.2017.
 */
module.exports = {
    port: 8000,

    classIndex: [
        'recruitApprovedTopic',     // галка
        'lockedTopic'               // замок
    ],

    links: [
        'UpForAnything'/*,
         'Raid',
         'Nightfall',
         'Strikes',
         'TrialsOfNine',
         'CruciblePvP'*/
    ],

    prefix: '/ru/Forums/Topics?pNumber=0&tSort=1&tType=0&lang=ru&d=3&tg=Recruitment%20BattleNet%20',

    postfix: '',

    site: 'https://www.bungie.net',

    categoriesClass: '.navItem.BattleNet>a',

    activityClass: '.recruitmentbattlenet>.threadContainer>.threadInfoBox>.threadMeta>.allMeta',

    maximumLastTime: 600,

    useDevJson: true,

    devJSON: JSON.parse('[{"name":"Strikes","activity":[]},{"name":"UpForAnything","activity":[{"link":"https://www.bungie.net/ru/Forums/Post/239007607?sort=0&page=0","text":"timuuuuuur","places":1,"authorLink":"https://www.bungie.net/ru/User/Profile?id=17039936","authorName":"Kapla","time":"90м. 47с."},{"link":"https://www.bungie.net/ru/Forums/Post/238999749?sort=0&page=0","text":"Любая деятельность","places":5,"authorLink":"https://www.bungie.net/ru/User/Profile?id=17109933","authorName":"DRAGON_DX","time":"284м. 59с."},{"link":"https://www.bungie.net/ru/Forums/Post/238999514?sort=0&page=0","text":"Набор в клан Hamster Rage","places":5,"authorLink":"https://www.bungie.net/ru/User/Profile?id=16948847","authorName":"Bapejka","time":"290м. 25с."},{"link":"https://www.bungie.net/ru/Forums/Post/238928833?sort=0&page=0","text":"Любая деятельность","places":5,"authorLink":"https://www.bungie.net/ru/User/Profile?id=16919045","authorName":"Verruct","time":"570м. 9с."}]},{"name":"Nightfall","activity":[{"link":"https://www.bungie.net/ru/Forums/Post/239007601?sort=0&page=0","text":"Сумрачный налет престиж","places":1,"authorLink":"https://www.bungie.net/ru/User/Profile?id=16790017","authorName":"GearOfDeath","time":"91м. 1с."},{"link":"https://www.bungie.net/ru/Forums/Post/238995777?sort=0&page=0","text":"Сумрачный налёт","places":1,"authorLink":"https://www.bungie.net/ru/User/Profile?id=17094462","authorName":"Valek","time":"351м. 2с."},{"link":"https://www.bungie.net/ru/Forums/Post/238985068?sort=0&page=0","text":"Сумрачный налет Престиж 300+ с опытом","places":1,"authorLink":"https://www.bungie.net/ru/User/Profile?id=14961555","authorName":"varitas228","time":"578м. 36с."},{"link":"https://www.bungie.net/ru/Forums/Post/238985139?sort=0&page=0","text":"Сумрачный налет","places":1,"authorLink":"https://www.bungie.net/ru/User/Profile?id=15051043","authorName":"Jaar","time":"587м. 31с."}]},{"name":"TrialsOfNine","activity":[]},{"name":"CruciblePvP","activity":[]},{"name":"Raid","activity":[{"link":"https://www.bungie.net/ru/Forums/Post/239010040?sort=0&page=0","text":"Пойду в Левиафан 300+ лайта и дискорд присутствуют, опыт есть, кто собирается, зовите.","places":5,"authorLink":"https://www.bungie.net/ru/User/Profile?id=17145752","authorName":"Ufos","time":"7м. 1с."},{"link":"https://www.bungie.net/ru/Forums/Post/239010024?sort=0&page=0","text":"Рейд","places":5,"authorLink":"https://www.bungie.net/ru/User/Profile?id=17245987","authorName":"Bigby","time":"7м. 53с."},{"link":"https://www.bungie.net/ru/Forums/Post/238995996?sort=0&page=0","text":"Рейд нормал","places":1,"authorLink":"https://www.bungie.net/ru/User/Profile?id=16976351","authorName":"Kashtane","time":"338м. 53с."},{"link":"https://www.bungie.net/ru/Forums/Post/238994110?sort=0&page=0","text":"Рейд Нормал/Престиж (Ищу группу!) Титан 305","places":1,"authorLink":"https://www.bungie.net/ru/User/Profile?id=16976351","authorName":"Kashtane","time":"400м. 56с."},{"link":"https://www.bungie.net/ru/Forums/Post/238992974?sort=0&page=0","text":"1 место на босса, 270+","places":1,"authorLink":"https://www.bungie.net/ru/User/Profile?id=16562588","authorName":"Prorok1101","time":"419м. 11с."},{"link":"https://www.bungie.net/ru/Forums/Post/238985098?sort=0&page=0","text":"Рейд-открыть сундуки","places":3,"authorLink":"https://www.bungie.net/ru/User/Profile?id=16959159","authorName":"hellniky","time":"588м. 15с."}]}]')
};