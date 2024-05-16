import express from "express";
import multer from "multer";
import path from "path";
import Ticket from "../models/Tickets.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

fs.mkdirSync("public/img/tickets", { recursive: true });

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/tickets");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/tickets", (req, res) => {
  Ticket.getAll((err, tickets) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении пассажиров:" });
      return;
    }
    tickets.forEach((ticket) => {
      let date = new Date(ticket.Дата_выдачи);
      ticket.Дата_выдачи = date.toISOString().substring(0, 10);
    });
    res.json(tickets);
  });
});
router.get("/tickets/:id", (req, res) => {
  Ticket.getById(req.params.id, (err, ticket) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении пассажира:" });
      return;
    }
    ticket.forEach((ticket) => {
      let date = new Date(ticket.Дата_выдачи);
      ticket.Дата_выдачи = date.toISOString().substring(0, 10);
    });
    res.json(ticket);
  });
});
router.post("/tickets", upload.single("photo"), (req, res) => {
  let ticketData = {
    Статус: req.body.status,
    Дата_выдачи: req.body.date,
    Пункт_назначения: req.body.naz,
    Пункт_прибытия: req.body.pri,
    Направление: req.body.path,
    Вид_билета: req.body.ticket,
    Цена: req.body.price,
    Место: req.body.place,
    Фото: "http://77.222.53.207:3000/" + req.file.path.replace(/\\/g, "/"),
  };

  Ticket.add(ticketData, (err, result) => {
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

router.delete("/tickets/:id", (req, res) => {
  Ticket.getById(req.params.id, (err, ticket) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении пассажира:" });
      return;
    }

    Ticket.delete(req.params.id, (err, result) => {
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
router.delete("/delete-all-tickets", (req, res) => {
  Ticket.deleteAll((err, result) => {
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
router.put("/tickets/:id", upload.single("photo"), (req, res) => {
  let ticketData = {
    Статус: req.body.status,
    Дата_выдачи: req.body.date,
    Пункт_назначения: req.body.naz,
    Пункт_прибытия: req.body.pri,
    Направление: req.body.path,
    Вид_билета: req.body.ticket,
    Цена: req.body.price,
    Место: req.body.place,
  };

  if (req.file) {
    ticketData.Фото =
      "http://77.222.53.207:3000/" + req.file.path.replace(/\\/g, "/");
  }

  Ticket.update(req.params.id, ticketData, (err, result) => {
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
