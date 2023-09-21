const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.post("/enviar-email", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "tecnicoslimport@gmail.com", // Seu e-mail Gmail
      pass: "VMf28011043@" // Sua senha
    }
  });

  const mailOptions = {
    from: "tecnicoslimport@gmail.com",
    to: "tecnicoslimport@gmail.com", // Email do destinatário
    subject: assunto,
    text: `Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Erro ao enviar o e-mail.");
    } else {
      console.log("E-mail enviado: " + info.response);
      res.send("E-mail enviado com sucesso!");
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
