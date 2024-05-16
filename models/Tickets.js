import db from "../sql.js";

let Ticket = {};

Ticket.getAll = (callback) => {
  db.query("SELECT * FROM tickets", callback);
};

Ticket.getById = (id, callback) => {
  db.query("SELECT * FROM tickets WHERE id =?", [id], callback);
};

Ticket.add = (passangerData, callback) => {
  db.query("INSERT INTO tickets SET?", passangerData, callback);
};

Ticket.update = (id, passangerData, callback) => {
  db.query("UPDATE tickets SET? WHERE id =?", [passangerData, id], callback);
};

Ticket.delete = (id, callback) => {
  db.query("DELETE FROM tickets WHERE id =?", [id], callback);
};

Ticket.deleteAll = (callback) => {
  db.query("DELETE FROM tickets", callback);
};
export default Ticket;
