
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



/*

app.post("/send-email", async (req, res) => {
  try {
    const { vrijeme_vaganja, lokacija_vaganja } = req.body; 
    const response = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        accessToken: PRIVATE_KEY,
        
        template_params: {
          vrijeme_vaganja: vrijeme_vaganja,
          lokacija_vaganja: lokacija_vaganja,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json({
      message: "Email uspješno poslan!",
      data: response.data,
    });
  } catch (error) {
    console.error("Error details:", error.toJSON ? error.toJSON() : error);
    res.status(500).json({
      error: "Greška prilikom slanja emaila!",
      details: (error.response && error.response.data) || error.message,
    });
  }
});
*/
/*
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL, // your email
    pass: process.env.PASSWORD, // your email password or app password
  },
});

app.post("/send-email", async (req, res) => {
  try {
    console.log("Sending email...");
    const { vrijeme_vaganja, lokacija_vaganja } = req.body;

    const mailOptions = {
      from: process.env.EMAIL,
      to: "alabinjan6@gmail.com",
      subject: "Camunda Process Notification",
      text: `Vrijeme vaganja: ${vrijeme_vaganja}, Lokacija vaganja: ${lokacija_vaganja}`,
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!", info });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Error sending email", details: error.message });
  }
});
*/
app.listen(PORT, () => {
  console.log(`Poslužitelj dela na adresi http://localhost:${PORT}`);
});
