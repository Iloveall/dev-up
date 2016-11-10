module.exports = function() {

  var faker = require('faker');

  var data = { flats: [] };

  function getImages() {
    var arr = [];
    var range = Math.floor(Math.random() * (5 - 0)) + 0;

    for (var i = 0; i <= range; i++) {
        switch (i) {
          case 1: arr.push(faker.image.city());
            break;
          case 2: arr.push(faker.image.nightlife());
            break;
          case 3: arr.push(faker.image.transport());
            break;
          case 4: arr.push(faker.image.technics());
            break;
      }
    }

    return arr.length ? arr : null;
  }

  for (var i = 0; i < 100; i++) {
    data.flats.push({
       id: i,
       cost: faker.finance.amount(),
       description: faker.lorem.paragraph(),
       location: faker.address.country(),
       longTerm: faker.random.boolean(),
       photos: getImages()
     });
  }

  return data;
};
