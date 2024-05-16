import db from "../sql.js";

let Passenger = {};

Passenger.getAll = (callback) => {
  db.query("SELECT * FROM passengers", callback);
};

Passenger.getById = (id, callback) => {
  db.query("SELECT * FROM passengers WHERE id =?", [id], callback);
};

Passenger.add = (passangerData, callback) => {
  db.query("INSERT INTO passengers SET?", passangerData, callback);
};

Passenger.update = (id, passangerData, callback) => {
  db.query("UPDATE passengers SET? WHERE id =?", [passangerData, id], callback);
};

Passenger.delete = (id, callback) => {
  db.query("DELETE FROM passengers WHERE id =?", [id], callback);
};

Passenger.deleteAll = (callback) => {
  db.query("DELETE FROM passengers", callback);
};
export default Passenger;
