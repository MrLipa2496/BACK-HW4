const { sequelize, Phone } = require('./models');

(async function () {
  try {
    await sequelize.sync({ force: true });

    //! CREATE
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
      console.log(`Phone created: ${JSON.stringify(createdPhone.get())}`);
    }
  } catch (error) {
    console.error('Error creating phones:', error);
  }
})();
