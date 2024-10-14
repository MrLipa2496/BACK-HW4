const { Op } = require('sequelize');
const { sequelize, Phone } = require('./models');

(async function () {
  try {
    await sequelize.sync({ force: true });

    //! CREATE
    // додавання нового телефону,
    const phones = [
      {
        model: 'iPhone 13',
        brand: 'Apple',
        yearOfManufacture: 2021,
        ramSize: '6GB',
        processor: 'A15 Bionic',
        screenSize: '6.1 inches',
        hasNFC: true,
      },
      {
        model: 'Galaxy S23',
        brand: 'Samsung',
        yearOfManufacture: 2024,
        ramSize: '8GB',
        processor: 'Exynos 2100',
        screenSize: '6.2 inches',
        hasNFC: true,
      },
      {
        model: 'Redmi Note 12S',
        brand: 'Xiaomi',
        yearOfManufacture: 2021,
        ramSize: '8GB',
        processor: 'Google Tensor',
        screenSize: '6.4 inches',
        hasNFC: true,
      },
      {
        model: 'OnePlus 9',
        brand: 'OnePlus',
        yearOfManufacture: 2021,
        ramSize: '8GB',
        processor: 'Snapdragon 888',
        screenSize: '6.55 inches',
        hasNFC: true,
      },
      {
        model: 'Xiaomi Mi 11',
        brand: 'Xiaomi',
        yearOfManufacture: 2021,
        ramSize: '8GB',
        processor: 'Snapdragon 888',
        screenSize: '6.81 inches',
        hasNFC: true,
      },
      {
        model: 'Sony Xperia 5 III',
        brand: 'Sony',
        yearOfManufacture: 2021,
        ramSize: '8GB',
        processor: 'Snapdragon 888',
        screenSize: '6.1 inches',
        hasNFC: true,
      },
    ];

    for (const phone of phones) {
      const createdPhone = await Phone.create(phone);
      //   console.log(createdPhone.get());
    }

    // отримання списку телефонів (* 3-я сторінка при перегляді по 4 телефони на сторінці, упорядкованих за роком виробництва),
    const page = 2;
    const pageSize = 4;

    const listOfPhones = await Phone.findAll({
      raw: true,
      order: [['yearOfManufacture', 'DESC']],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    // console.log(listOfPhones);

    // отримання списку телефонів поточного року видання

    const currentYear = new Date().getFullYear();

    const phonesOfCurrentYear = await Phone.findAll({
      raw: true,
      where: {
        yearOfManufacture: currentYear,
      },
    });

    // console.log(phonesOfCurrentYear);

    // отримання списку телефонів старше 2022 року випуску
    const phonesOlder2022 = await Phone.findAll({
      raw: true,
      where: {
        yearOfManufacture: {
          [Op.lt]: 2022,
        },
      },
    });

    // console.log(phonesOlder2022);

    //! UPDATE: змінити розмір оперативної пам'яті телефону з id: 1,
    const updateRamSize = await Phone.update(
      { ramSize: '16GB' },
      {
        raw: true,
        returning: true,
        where: {
          id: 1,
        },
      }
    );
    // console.log(updateRamSize[1][0]);

    //! UPDATE: додати нфс всім телефонам 2024 року випуску
    const updateNFCFor2023Phones = await Phone.update(
      { hasNFC: true },
      { where: { yearOfManufacture: 2024 }, raw: true, returning: true }
    );
    // console.log(updateNFCFor2023Phones[1][0]);

    // видалення телефону з id: 3.

    const deletedPhone = await Phone.destroy({
      where: { id: 3 },
    });
    // console.log(deletedPhone);

    //! видалення телефонів 2015 року випуску
    const deletedPhones2015 = await Phone.destroy({
      where: { yearOfManufacture: 2015 },
    });
    // console.log(deletedPhones2015);

    // вивести кількість телефонів кожної марки
    const phoneCounts = await Phone.findAll({
      attributes: [
        'brand',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: ['brand'],
      raw: true,
    });

    console.log('Кількість телефонів кожної марки:');
    phoneCounts.forEach(phone => {
      console.log(`Марка: ${phone.brand}, Кількість: ${phone.count}`);
    });
  } catch (error) {
    console.error('Error creating phones:', error);
  }
})();
