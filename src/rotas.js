const express = require('express');
const usuario = require('./controladores/controlador-usuario');
const conta = require('./controladores/controlador-conta');
const validarSenhas = require('./intermediarios');

const rotas = express();

rotas.get('/contas', validarSenhas, usuario.listarContasBancarias);
rotas.post('/contas', usuario.criarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', usuario.atualizarContaBancaria);
rotas.delete('/contas/:numeroConta', usuario.excluirContaBancaria);

rotas.post('/transacoes/depositar', conta.depositar);
rotas.post('/transacoes/sacar', conta.sacar);
rotas.post('/transacoes/transferir', conta.transferir);
rotas.get('/contas/saldo', conta.saldo);
rotas.get('/contas/extrato', conta.extrato);

module.exports = rotas