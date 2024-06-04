const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("dataTickets.db");

let jsonTemaplatedata = { data: "", status: "", message: "" };

const userOperations = {
  getUserByNumEmp: (numEmp) => {
    const selectAllQuery = `SELECT * FROM User WHERE NUMEMP = ?;`;
    return new Promise((resolve, reject) => {
      db.all(selectAllQuery, [numEmp], (err, row) => {
        let res = undefined;
        if (err) {
          reject(err);
        } else if (row.length == 0) {
          jsonTemaplatedata.status = "Error";
          jsonTemaplatedata.message =
            "Su numero de empleado no esta registrado en la base de datos";
          jsonTemaplatedata.data = undefined;
          res = "Error";
        } else {
          jsonTemaplatedata.status = "Success";
          jsonTemaplatedata.message = "Usuario encontrado";
          jsonTemaplatedata.data = row;
          res = row[0];
        }
        resolve(res);
      });
    });
  },
  insertUser: (user) => {
    const insertQuery = `INSERT INTO User(numEmp, fullName, dpto,password) VALUES (?, ?, ?, ?);`;
    return new Promise((resolve, reject) => {
      db.run(
        insertQuery,
        [user.numEmp, user.fullName, user.dpto, user.password],
        (err) => {
          if (err) {
            reject(err);
          }
          jsonTemaplatedata.status = "Success";
          jsonTemaplatedata.message = "Usuario creado";
          jsonTemaplatedata.data = undefined;
          resolve("Success");
        }
      );
    });
  },
};

const ticketsOperations = {
  getAllTickets: () => {
    const selectAllQuery = `SELECT * FROM tickets`;
    return new Promise((resolve, reject) => {
      db.all(selectAllQuery, [], (err, rows) => {
        if (err) {
          reject(err);
        }
        jsonTemaplatedata.status = "Success";
        jsonTemaplatedata.message = "Tickets encontrados";
        jsonTemaplatedata.data = rows;
        resolve(rows);
      });
    });
  },
  insertTicket: ({
    NUMEMP,
    TIPO,
    FECHA,
    HORA,
    STATUS,
    DEPARTAMENTO,
    DESC,
    NOTAS,
  }) => {
    const selectAllQuery = `INSERT INTO Tickets( NUMEMP,TIPO,FECHA,HORA,STATUS,DEPARTAMENTO,DESC,NOTAS ) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? );`;
    return new Promise((resolve, reject) => {
      db.all(
        selectAllQuery,
        [NUMEMP, TIPO, FECHA, HORA, STATUS, DEPARTAMENTO, DESC, NOTAS],
        (err, rows) => {
          if (err) {
            reject(err);
          }
          jsonTemaplatedata.status = "Success";
          jsonTemaplatedata.message = "Ticket creado";
          jsonTemaplatedata.data = rows;
          resolve("Success");
        }
      );
    });
  },
  getTicketsByNumEmp: (numEmp) => {
    const selectAllQuery = `SELECT * FROM Tickets WHERE NUMEMP = ?;`;
    return new Promise((resolve, reject) => {
      db.all(selectAllQuery, [numEmp], (err, rows) => {
        let res = undefined;
        if (err) {
          reject(err);
        } else if (rows.length == 0) {
          jsonTemaplatedata.status = "Error";
          jsonTemaplatedata.message =
            "No hay tickets con ese numero de empleado";
          jsonTemaplatedata.data = undefined;
          res = "Error";
        } else {
          jsonTemaplatedata.status = "Success";
          jsonTemaplatedata.message = "Tickets encontrados";
          jsonTemaplatedata.data = rows;
          res = rows;
        }
        resolve(res);
      });
    });
  },
  getTicketsByDepto: (Depto) => {
    const selectAllQuery = `SELECT Tickets.ID,Tickets.NUMEMP,Tickets.TIPO,Tickets.FECHA,Tickets.HORA,Tickets.STATUS,Tickets.DEPARTAMENTO,Tickets.DESC,Tickets.NOTAS, user.dpto as DPTOSENDER FROM tickets INNER JOIN User ON tickets.NUMEMP = user.numEmp WHERE DEPARTAMENTO = ?;`;
    return new Promise((resolve, reject) => {
      db.all(selectAllQuery, [Depto], (err, rows) => {
        let res = undefined;
        if (err) {
          reject(err);
        } else if (rows.length == 0) {
          jsonTemaplatedata.status = "Error";
          jsonTemaplatedata.message = "No hay tickets con ese departamento";
          jsonTemaplatedata.data = undefined;
          res = "Error";
        } else {
          jsonTemaplatedata.status = "Success";
          jsonTemaplatedata.message = "Tickets encontrados";
          jsonTemaplatedata.data = `${rows}`;
          res = rows;
        }
        resolve(res);
      });
    });
  },
  updateTicketReciver: (ticket) => {
    const updateQuery = `UPDATE tickets SET STATUS = ?, NOTAS = ? WHERE ID = ?`;
    console.log(ticket);
    return new Promise((resolve, reject) => {
      db.all(
        updateQuery,
        [ticket.STATUS, ticket.NOTAS, ticket.ID],
        (err, rows) => {
          if (err) {
            reject(err);
          }
          jsonTemaplatedata.status = "Success";
          jsonTemaplatedata.message =
            "Se a editado con exito el ticket(Recibido)";
          jsonTemaplatedata.data = rows;
          resolve("Success");
        }
      );
    });
  },
  updateTicketSender: (ticket) => {
    const updateQuery = `UPDATE tickets SET DESC = ? WHERE ID = ?`;
    return new Promise((resolve, reject) => {
      db.all(updateQuery, [ticket.DESC, ticket.ID], (err) => {
        if (err) {
          reject(err);
        }
        jsonTemaplatedata.status = "Success";
        jsonTemaplatedata.message = "Se a editado con exito el ticket(Enviado)";
        jsonTemaplatedata.data = undefined;
        resolve("Success");
      });
    });
  },
};
module.exports = { ticketsOperations, userOperations };
