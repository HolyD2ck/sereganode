import express from "express";
import ticketsRouter from "./controllers/TicketsController.js";
import passengersRouter from "./controllers/PassengersController.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/run-passenger-faker", (req, res) => {
  exec("node PassengerFaker.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  res.send("PassengerFaker.js запущен");
});

app.get("/run-ticket-faker", (req, res) => {
  exec("node TicketFaker.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  res.send("TicketFaker.js запущен");
});
app.use("/", ticketsRouter);
app.use("/", passengersRouter);

const server = app.listen(3000, () => {
  console.log("Server started on port 3000");
});
