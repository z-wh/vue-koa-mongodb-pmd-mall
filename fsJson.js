const fs = require('fs');


fs.readFile('./datajson/goods.json', 'utf8', (err, data) => {
    let i = 0;
    let temp = [];
    let newData = JSON.parse(data);
    newData.RECORDS.map((value, index) => {
        if (value.IMAGE1 != null) {
            i++;
            console.log(value.NAME);
            temp.push(value);
        }
    })
    console.log(i);

    fs.writeFile('./datajson/newGoods.json', JSON.stringify(temp), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('数据提纯写入文件成功');
        }
    })
});
