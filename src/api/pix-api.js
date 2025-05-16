const express = require('express');
const bodyParser = require('body-parser');
const Gerencianet = require('@gerencianet/gn-api-sdk-node');

const app = express();
app.use(bodyParser.json());

// Configure com suas credenciais do Gerencianet
const options = {
  client_id: 'SEU_CLIENT_ID',
  client_secret: 'SEU_CLIENT_SECRET',
  pix_cert: './seu-certificado-pix.p12', // caminho do certificado
  sandbox: true // ou false em produção
};

const gn = Gerencianet(options);

// Rota para criar QR Code dinâmico
app.post('/api/pix/create', async (req, res) => {
  try {
    const { value, description, receiverPixKey, ongId } = req.body;
    const txid = `ong${ongId}-${Date.now()}`;
    const body = {
      calendario: { expiracao: 3600 },
      devedor: {},
      valor: { original: value.toFixed(2) },
      chave: receiverPixKey,
      solicitacaoPagador: description
    };
    const response = await gn.pixCreateImmediateCharge({ txid }, body);
    const locId = response.loc.id;
    const qrcode = await gn.pixGenerateQRCode({ id: locId });
    res.json({ qrCode: qrcode.qrcode, txid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar QR Code' });
  }
});

// Rota para checar status do pagamento
app.get('/api/pix/status', async (req, res) => {
  try {
    const { txid } = req.query;
    const response = await gn.pixDetailCharge({ txid });
    const status = response.status === 'CONCLUIDA' ? 'CONFIRMED' : 'PENDING';
    res.json({ status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao consultar status' });
  }
});

app.listen(3001, () => {
  console.log('API Pix rodando na porta 3001');
});