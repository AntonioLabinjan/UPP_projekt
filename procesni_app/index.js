
//const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, PRIVATE_KEY, EMAIL, PASSWORD } = process.env;
// const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, PRIVATE_KEY, EMAIL, PASSWORD } = process.env;


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Zahtjev primljen!");
  res.status(200).send("Pozdrav iz express-sendgrid poslužitelja!");
});

app.post("/send-email", async (req, res) => {
  try {
    const { vrijeme_vaganja, lokacija_vaganja } = req.body;

    const msg = {
      to: "alabinjan6@gmail.com", 
      from: "attendance.logged@gmail.com", 
      subject: "Camunda Process Notification",
      text: `Vrijeme vaganja: ${vrijeme_vaganja}, Lokacija vaganja: ${lokacija_vaganja}`,
    };

    const response = await sgMail.send(msg);

    res.status(200).json({
      message: "Email uspješno poslan!",
      data: response,
    });
  } catch (error) {
    console.error("Error details:", error.toString());
    res.status(500).json({
      error: "Greška prilikom slanja emaila!",
      details: error.toString(),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Poslužitelj dela na adresi http://localhost:${PORT}`);
});
