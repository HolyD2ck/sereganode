import express from "express";
import multer from "multer";
import path from "path";
import Passenger from "../models/Passengers.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/passengers");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/passengers", (req, res) => {
  Passenger.getAll((err, passengers) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении пассажиров:" });
      return;
    }
    passengers.forEach((passenger) => {
      let date = new Date(passenger.Дата_рождения);
      passenger.Дата_рождения = date.toISOString().substring(0, 10);
    });
    res.json(passengers);
  });
});
router.get("/passengers/:id", (req, res) => {
  Passenger.getById(req.params.id, (err, passenger) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении пассажира:" });
      return;
    }
    passenger.forEach((passenger) => {
      let date = new Date(passenger.Дата_рождения);
      passenger.Дата_рождения = date.toISOString().substring(0, 10);
    });
    res.json(passenger);
  });
});
router.post("/passengers", upload.single("photo"), (req, res) => {
  let passengerData = {
    Фамилия: req.body.surname,
    Имя: req.body.name,
    Отчество: req.body.patronymic,
    Дата_рождения: req.body.birth_date,
    Номер_телефона: req.body.phone,
    Паспортные_данные: req.body.pass,
    Адрес_проживания: req.body.address,
    Email: req.body.email,
    Фото: "http://localhost:3000/" + req.file.path.replace(/\\/g, "/"),
  };

  Passenger.add(passengerData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при добавлении пассажира:" });
      return;
    }
    res.json({ message: "Пассажир успешно добавлен" });
  });
});

router.delete("/passengers/:id", (req, res) => {
  Passenger.getById(req.params.id, (err, passenger) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении пассажира:" });
      return;
    }

    Passenger.delete(req.params.id, (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Произошла ошибка при удалении пассажира:" });
        return;
      }
      res.json({ message: "Пассажир успешно удален" });
    });
  });
});
router.delete("/delete-all-passengers", (req, res) => {
  Passenger.deleteAll((err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при удалении Пассажир:" });
      return;
    }
    res.json({ message: "Все Пассажир успешно удалены" });
  });
});
router.put("/passengers/:id", upload.single("photo"), (req, res) => {
  let passengerData = {
    Фамилия: req.body.surname,
    Имя: req.body.name,
    Отчество: req.body.patronymic,
    Дата_рождения: req.body.birth_date,
    Номер_телефона: req.body.phone,
    Паспортные_данные: req.body.pass,
    Адрес_проживания: req.body.address,
    Email: req.body.email,
  };

  if (req.file) {
    passengerData.Фото =
      "http://localhost:3000/" + req.file.path.replace(/\\/g, "/");
  }

  Passenger.update(req.params.id, passengerData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при обновлении Пассажир:" });
      return;
    }
    res.json({ message: "Пассажир успешно обновлен" });
  });
});

export default router;
