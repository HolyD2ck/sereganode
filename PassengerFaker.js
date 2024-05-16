import Passenger from "./models/Passengers.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = {
  names: [
    "Иван",
    "Анастасия",
    "Алексей",
    "Мария",
    "Петр",
    "Екатерина",
    "Дмитрий",
    "Юлия",
    "Антон",
    "Ольга",
    "Сергей",
    "Татьяна",
    "Григорий",
    "Елена",
    "Василий",
    "Наталья",
    "Владимир",
    "София",
    "Андрей",
    "Марина",
    "Кирилл",
  ],
  surnames: [
    "Иванов",
    "Смирнов",
    "Кузнецов",
    "Петров",
    "Соколов",
    "Лебедев",
    "Федоров",
    "Новиков",
    "Попов",
    "Васильев",
    "Ефимов",
    "Соловьёв",
    "Борисов",
    "Терентьев",
    "Титов",
    "Кравцов",
    "Шаповалов",
    "Павлов",
    "Ильин",
    "Степанов",
    "Михайлов",
  ],
  phones: [
    "+7 (901) 123-45-67",
    "+7 (902) 234-56-78",
    "+7 (913) 345-67-89",
    "+7 (914) 456-78-90",
    "+7 (915) 567-89-01",
    "+7 (916) 678-90-12",
    "+7 (917) 789-01-23",
    "+7 (918) 890-12-34",
    "+7 (919) 901-23-45",
    "+7 (920) 012-34-56",
  ],
  passportData: [
    "1234 567890",
    "2345 678901",
    "3456 789012",
    "4567 890123",
    "5678 901234",
    "6789 012345",
    "7890 123456",
    "8901 234567",
    "9012 345678",
    "0123 456789",
  ],
  addresses: [
    "Москва, ул. Ленина, д. 1",
    "Санкт-Петербург, ул. Некрасова, д. 2",
    "Новосибирск, ул. Крылова, д. 3",
    "Екатеринбург, ул. Репина, д. 4",
    "Нижний Новгород, ул. Мира, д. 5",
    "Самара, ул. Московская, д. 6",
    "Омск, ул. Карла Маркса, д. 7",
    "Казань, ул. Тукая, д. 8",
    "Челябинск, ул. Кирова, д. 9",
    "Ростов-на-Дону, ул. Будённого, д. 10",
  ],
  emails: [
    "john.doe@gmail.com",
    "jane_doe@yahoo.com",
    "alex@yandex.ru",
    "sasha@mail.ru",
    "peter@bk.ru",
    "kate@list.ru",
    "dima@inbox.ru",
    "julia@yandex.ru",
    "anton@mail.ru",
    "olga@bk.ru",
    "sergey@yandex.ru",
    "tanya@mail.ru",
    "grisha@yandex.ru",
    "elena@bk.ru",
    "vasya@yandex.ru",
    "natalia@mail.ru",
    "vlad@yandex.ru",
    "sophia@mail.ru",
    "andrey@yandex.ru",
    "marina@bk.ru",
    "kirill@yandex.ru",
  ],
};

function getRandomItemFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate() {
  const start = new Date(1950, 0, 1);
  const end = new Date(2023, 11, 31);
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return `${randomDate.getFullYear()}-${String(
    randomDate.getMonth() + 1
  ).padStart(2, "0")}-${String(randomDate.getDate()).padStart(2, "0")}`;
}

function generatePassengerData() {
  return {
    Имя: getRandomItemFromArray(data.names),
    Фамилия: getRandomItemFromArray(data.surnames),
    Отчество: getRandomItemFromArray(data.names),
    Дата_рождения: getRandomDate(),
    Номер_телефона: getRandomItemFromArray(data.phones),
    Паспортные_данные: getRandomItemFromArray(data.passportData),
    Адрес_проживания: getRandomItemFromArray(data.addresses),
    Email: getRandomItemFromArray(data.emails),
    Фото: "http://localhost:3000/" + getRandomImagePath(),
  };
}
function getRandomImagePath() {
  const fakerFolder = path.join(__dirname, "public", "img", "faker");
  const imageFiles = fs.readdirSync(fakerFolder);
  const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
  const relativePath = path.join("public", "img", "faker", randomImage);
  return relativePath.replace(/\\/g, "/");
}

for (let i = 0; i < 100; i++) {
  const passengerData = generatePassengerData();
  Passenger.add(passengerData, (err, result) => {
    if (err) {
      console.error(`Error adding passenger: ${err}`);
      return;
    }
    console.log(`Passenger added successfully: ${result}`);
  });
}
