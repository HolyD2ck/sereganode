import Ticket from "./models/Tickets.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = {
  statuses: ["оплачен", "не оплачен", "забронирован", "возвращен"],
  destinations: [
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
    "Нижний Новгород",
    "Самара",
    "Омск",
    "Казань",
    "Челябинск",
    "Ростов-на-Дону",
  ],
  types: ["эконом", "бизнес", "премиум"],
};

function getRandomItemFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate() {
  const start = new Date(2022, 0, 1);
  const end = new Date(2023, 11, 31);
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return `${randomDate.getFullYear()}-${String(
    randomDate.getMonth() + 1
  ).padStart(2, "0")}-${String(randomDate.getDate()).padStart(2, "0")}`;
}
function getRandomImagePath() {
  const fakerFolder = path.join(__dirname, "public", "img", "faker");
  const imageFiles = fs.readdirSync(fakerFolder);
  const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
  const relativePath = path.join("public", "img", "faker", randomImage);
  return relativePath.replace(/\\/g, "/");
}

function generateTicketData() {
  return {
    Статус: getRandomItemFromArray(data.statuses),
    Дата_выдачи: getRandomDate(),
    Пункт_назначения: getRandomItemFromArray(data.destinations),
    Пункт_прибытия: getRandomItemFromArray(data.destinations),
    Направление: `${getRandomItemFromArray(
      data.destinations
    )} - ${getRandomItemFromArray(data.destinations)}`,
    Вид_билета: getRandomItemFromArray(data.types),
    Цена: Math.floor(Math.random() * 10000),
    Место: Math.floor(Math.random() * 100),
    Фото: "http://77.222.53.207:3000/" + getRandomImagePath(),
  };
}

for (let i = 0; i < 100; i++) {
  const ticketData = generateTicketData();
  Ticket.add(ticketData, (err, result) => {
    if (err) {
      console.error(`Error adding ticket: ${err}`);
      return;
    }
    console.log(`Ticket added successfully: ${result}`);
  });
}
