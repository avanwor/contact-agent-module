
const faker = require('faker');
const fs = require('fs');

let agentsFile = (d) => {
    let headLine = 'agentId,name,premier,company,reviews,recentSales,phone,imgurl \n';
    let m = d / 1000;
    let counter = 0
    let writeStream = fs.createWriteStream('database/seed/csv/agentsfile.csv', { flags : 'w' });
    writeStream.write(headLine)
    for (let k = 1; k <= m; k++) {
        let lines = ''
        for (let i = 1; i <= 1000; i++) {
            lines += (i+counter) + "," + faker.name.findName() + "," + faker.random.boolean() + ",\"" + faker.company.companyName() + "\"," + faker.random.number(100) + "," + faker.random.number(40) + "," + faker.phone.phoneNumberFormat(1) + "," + faker.image.avatar() + '\n'
        }
        counter += 1000;
        writeStream.write(lines)
    }
}

let homesFile = (d) => {
    let headLine = 'houseId,address,reviews \n';
    let m = d / 100;
    let counter = 0
    let writeStream = fs.createWriteStream('database/seed/csv/homesfile.csv', { flags : 'w' });
    writeStream.write(headLine)
    for (let k = 1; k <= m; k++) {
        let hundredLines = ''
        for (let i = 1; i <= 1000; i++) {
            //may update random number to 10m for all agents
            hundredLines += (i+counter) + "," + faker.address.streetAddress() + "," + (1+faker.random.number(d-2)) + '\n'
        }
        counter += 1000;
        writeStream.write(hundredLines)
    }
}

let messagesFile = (d) => {
    let headLine = 'messageId,homeId,name,phone,email,note,created \n';
    let m = d / 1000;
    let counter = 0
    let writeStream = fs.createWriteStream('database/seed/csv/messagesfile.csv', { flags : 'w' });
    writeStream.write(headLine)

    let hipsum = 'Lorem ipsum dolor amet tattooed kale chips vice air plant synth locavore jean shorts fanny pack sriracha subway tile typewriter ramps single-origin coffee four loko microdosing beard enamel pin bespoke jianbing pok pok tofu next level keffiyeh bitters hell of tumeric readymade brunch organic four loko hot chicken echo park taxidermy pickled pug paleo brooklyn kale chips jean shorts small batch chia farm-to-table intelligentsia vape affogato iceland single-origin coffee cray street art butcher VHS farm-to-table austin pork belly irony ennui cred williamsburg PBR&B bespoke bushwick tumeric kitsch health goth +1 bicycle rights tumeric farm-to-table hell of asymmetrical prism marfa pitchfork VHS la croix adaptogen brooklyn PBR&B heirloom master cleanse shaman jean shorts chillwave marfa iPhone small batch dreamcatcher gastropub slow-carb franzen activated charcoal neutra squid pitchfork aesthetic la croix austin viral palo santo cloud bread thundercats vexillologist raw denim health goth tofu seitan gentrify microdosing retro lomo vegan glossier brunch food truck banjo tattooed gluten-free narwhal before they sold out hammock man braid keffiyeh four dollar toast stumptown neutra hashtag chambray kogi messenger bag fanny pack food truck authentic live-edge mumblecore tote bag raclette bicycle rights selvage offal craft beer blue bottle copper mug coloring book lomo lo-fi farm-to-table XOXO glossier hexagon asymmetrical bicycle rights hammock try-hard vinyl neutra intelligentsia man braid gastropub deep v ugh brunch';
    let hipsumArray = hipsum.split(' ')
    
    for (let k = 1; k <= m; k++) {
        let lines = ''
        for (let i = 1; i <= 1000; i++) {
            let hipRand = Math.random()*217
            let badFormat = '"' + faker.date.past() + '"';
            let dateTime = badFormat.slice(1,badFormat.indexOf('GMT')) + 'PST'
            lines += (i+counter) + "," + (1+faker.random.number(d-2)) + "," + faker.name.findName() + "," + faker.phone.phoneNumberFormat(1) + "," + faker.internet.email() + "," + hipsumArray.slice(hipRand,hipRand+10).join(' ') + "," + dateTime + '\n'
        }
        counter += 1000;
        writeStream.write(lines)
    }
}

agentsFile(10000000); //10,000,000 takes 8min w/ loop@1000, 10min w/ loop @100
homesFile(10000000); //10,000,000 takes 20sec w/ forLoop@100
messagesFile(10000000); //10,000,000 takes 3min w/ forLoop@1000