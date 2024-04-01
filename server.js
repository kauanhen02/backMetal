const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/enviar-email', (req, res) => {
  const { nome, telefone, email, empresa, mensagem } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'metalgomesinfo@outlook.com',
      pass: 'metal123@'
    }
  });

  const mailOptions = {
    from: 'metalgomesinfo@outlook.com',
    to: 'kauansjx31@gmail.com',
    subject: 'Formulário de Contato',
    html: `
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Empresa:</strong> ${empresa}</p>
      <p><strong>Mensagem:</strong> ${mensagem}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error); // Imprime detalhes do erro no console
      res.status(500).send('Ocorreu um erro ao enviar o e-mail.');
    } else {
      console.log('E-mail enviado com sucesso:', info.response); // Imprime resposta do servidor no console
      res.send('E-mail enviado com sucesso!');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado e ouvindo na porta ${port}`);
});
