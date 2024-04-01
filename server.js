const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000; // Usando a porta fornecida pelo ambiente ou 3000 como padrão

// Configuração do Body Parser para analisar dados de formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para lidar com o envio do formulário
app.post('/enviar-email', (req, res) => {
  const { nome, telefone, email, empresa, mensagem } = req.body;

  // Configuração do Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'kauanhen06@outlook.com',
      pass: 'Montanha12'
    }
  });

  // Configuração do e-mail a ser enviado
  const mailOptions = {
    from: 'kauanhen06@outlook.com',
    to: 'email-que-deseja-receber-os-formularios@gmail.com',
    subject: 'Formulário de Contato',
    html: `
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Empresa:</strong> ${empresa}</p>
      <p><strong>Mensagem:</strong> ${mensagem}</p>
    `
  };

  // Envio do e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Ocorreu um erro ao enviar o e-mail.');
    } else {
      console.log('E-mail enviado: ' + info.response);
      res.send('E-mail enviado com sucesso!');
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado e ouvindo na porta ${port}`);
});
