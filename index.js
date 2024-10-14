const { sequelize, Phone } = require('./models');

(async function () {
  try {
    await sequelize.sync({ force: true });

    //! CREATE
    const phones = [
      {
        model: 'iPhone 14',
        brand: 'Apple',
        yearOfManufacture: 2022,
        ramSize: '6GB',
        processor: 'A15 Bionic',
        screenSize: '6.1 inches',
        hasNFC: true,
      },
      {
        model: 'Galaxy S21',
        brand: 'Samsung',
        yearOfManufacture: 2021,
        ramSize: '8GB',
        processor: 'Exynos 2100',
        screenSize: '6.2 inches',
        hasNFC: true,
      },
      {
        model: 'Pixel 6',
        brand: 'Google',
        yearOfManufacture: 2021,
        ramSize: '8GB',
        processor: 'Google Tensor',
        screenSize: '6.4 inches',
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
