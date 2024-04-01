const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
<<<<<<< HEAD
const port = process.env.PORT || 3000; // Usando a porta fornecida pelo ambiente ou 3000 como padrão
=======
const port = 3000; // ou qualquer porta de sua escolha
>>>>>>> 9391ba61a063ad0141e9f4828b8aa40d75519a65

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
      user: 'kauansjx31@outlook.com',
      pass: 'Montanha12'
    }
  });

  // Configuração do e-mail a ser enviado
  const mailOptions = {
    from: 'kauansjx31@outlook.com',
<<<<<<< HEAD
    to: 'email-que-deseja-receber-os-formularios@gmail.com',
=======
    to: 'email-de-destino@gmail.com',
>>>>>>> 9391ba61a063ad0141e9f4828b8aa40d75519a65
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
