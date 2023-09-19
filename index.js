const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const handlebars = require('handlebars');

const app = express();

app.get("/generate-pdf", async (req, res) => {
  const templatePath = path.join(__dirname, 'public', 'table.html');
  const outputPath = path.join(__dirname, 'public', 'output', 'output.pdf');

  const data = [
    {
      product_name: "Product A1",
      product_code: "A123",
      stock: "In Stock",
      currency: "USD",
      quantity: 10,
      price: 25.99,
      total_amount: 259.90,
    },
    {
      product_name: "Product B2",
      product_code: "B456",
      stock: "Out of Stock",
      currency: "EUR",
      quantity: 5,
      price: 15.75,
      total_amount: 78.75,
    } ,
   ];
  

  // Read the template content
  const templateContent = await fs.readFile(templatePath, 'utf-8');

  // Compile the template using Handlebars
  const compiledTemplate = handlebars.compile(templateContent);


  const additionalInfo = {
    total_amount_sum: 338.65,
    client_number: "12345",
    client_name: "John Doe",
    telegram_link: "https://t.me/your_telegram",
    instagram_link: "https://www.instagram.com/your_instagram",
    developer_number: "(90) 854 18 17",
    developer_link: "@isbot_istar",
  };
  // Replace the placeholders with data
  const mergedHtml = compiledTemplate({ data,title:"Melissa Kids",...additionalInfo});

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setContent(mergedHtml);
  await page.pdf({ path: outputPath, format: 'A4' });

  await browser.close();

  res.download(outputPath, 'output.pdf', async (err) => {
    if (err) {
      console.error(err);
    }

    try {
      await fs.writeFile(outputPath, '');
      console.log('File cleared.');
    } catch (writeErr) {
      console.error('Error clearing file:', writeErr);
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is running');
});
