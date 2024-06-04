const express = require("express");
const { ticketsOperations, userOperations } = require("./dbManager");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Si jala c:");
});

app.get("/admin", (req, res) => {
  if (req.query.pass == "sistemas2024*") {
    res.send("Bienvenido administrador");
  } else {
    res.send("Error");
  }
});

app.get("/user", (req, res) => {
  console.log(req.query.numEmp);
  userOperations.getUserByNumEmp(req.query.numEmp).then((user) => {
    console.log(user);
    res.send(user);
  });
});

app.post("/createUser", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  userOperations.insertUser(newUser).then((status) => {
    if (status == "Success") {
      res.send("User created successfully");
    } else {
      res.send("User not created, ERROR!");
    }
  });
});

app.get("/GETnumEmp", (req, res) => {
  ticketsOperations.getTicketsByNumEmp(req.query.numEmp).then((tickets) => {
    res.send(tickets);
  });
});

app.get("/GETdpto", (req, res) => {
  ticketsOperations.getTicketsByDepto(req.query.dpto).then((tickets) => {
    res.send(tickets);
  });
});

app.post("/createTicket", (req, res) => {
  const newTicket = req.body;
  // console.log(newTicket);
  ticketsOperations.insertTicket(newTicket).then((status) => {
    if (status == "Success") {
      res.send("Ticket created successfully");
    } else {
      res.send("Ticket not created, ERROR!");
    }
  });
});
//A quien le llega el ticket
app.put("/updateTicketReciver", (req, res) => {
  const updatedTicket = req.body;
  ticketsOperations.updateTicketReciver(updatedTicket).then((message) => {
    res.send(message);
  });
});

//A quien envia el ticket
app.put("/updateTicketSender", (req, res) => {
  const updatedTicket = req.body;
  ticketsOperations.updateTicketSender(updatedTicket).then((message) => {
    res.send(message);
  });
});

app.listen(3000, () => {
  console.log("Express server initialized");
});
