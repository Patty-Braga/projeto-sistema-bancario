let { contas, saques, depositos, transferencias } = require('../bancodedados');
let { verificaSenha, verificaConta, transferenciaEfetuada } = require('../funcoes/funcoes-conta');

const { format } = require('date-fns');


const depositar = (req, res) => {
    try {
        //VERIFICA SE NÚMERO DA CONTA E DEPÓSITO ESTÃO INFORMADOS NO BODY
        const { numero_conta, valor } = req.body

        if (numero_conta === "" || valor === "") {
            return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" })
        }

        //VERIFICA SE A CONTA INFORMADA EXISTE
        const contaVerificada = verificaConta(numero_conta, contas)

        if (!contaVerificada) {
            return res.status(404).json({ mensagem: "Não existe usuário cadastrado no número informado!" })
        }

        //VERIFICA SE O DEPÓSITO INFORMADO É MENOR OU IGUAL A ZERO
        if (valor <= 0) {
            return res.status(400).json({ mensagem: "O depósito não pode ser um valor menor ou igual a zero!" })
        }

        //SOMA O VALOR DO DEPÓSITO AO SALDO DA CONTA ENCONTRADA
        const momentoAtual = new Date();

        contaVerificada.saldo += Number(valor);

        const data = format(momentoAtual, "yyyy-MM-dd HH:mm:ss")

        const deposito = {
            data,
            numero_conta,
            valor,
        }

        depositos.push(deposito);

        return res.status(201).json(deposito)

    } catch (erro) {
        return res.status(400).json(erro)
    }
}

const sacar = (req, res) => {
    try {
        //VERIFICA NUMERO DA CONTA, VALOR DO SAQUE E SENHA FORAM INFORMADOS
        const { numero_conta, valor, senha } = req.body

        if (numero_conta === "" || valor === "" || senha === "") {
            return res.status(400).json({ mensagem: "O número da conta, valor do saque e senha são obrigatórios!" });
        }

        //VERIFICA SE A CONTA INFORMADA EXISTE
        const contaVerificada = verificaConta(numero_conta, contas)

        if (!contaVerificada) {
            return res.status(404).json({ mensagem: "Não existe usuário cadastrado no número informado!" })
        }

        //VERIFICA SE A SENHA INFORMADA É COMPATÍVEL COM A DO BANCO DE DADOS
        if (verificaSenha(req.body) === false) {
            return res.status(400).json({ mensagem: "Senha digitada é inválida!" })
        }

        //VERIFICA SE HÁ SALDO DISPONÍVEL PARA SAQUE
        if (contaVerificada.saldo < valor) {
            return res.status(400).json({ mensagem: "Não há saldo suficiente para o saque solicitado!" })
        }

        //SUBTRAI VALOR SACADO DO SALDO DA CONTA
        contaVerificada.saldo -= Number(valor);

        const saqueUsuario = {
            numero_conta,
            valor,
            senha
        }

        saques.push(saqueUsuario);

        return res.status(201).json(saqueUsuario);

    } catch (erro) {
        return res.status(400).json(erro)
    }
}

const transferir = (req, res) => {
    // VERIFICA SE O NÚMERO DA CONTA DE ORIGEM, DE DESTINO, SENHA DA CONTA DE ORIGEM E VALOR DA TRANSFERÊNCIA FORAM INFORMADOS NO BODY
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if (numero_conta_origem === "" || numero_conta_destino === "" || valor === "" || senha === "") {
        return res.status(400).json({ mensagem: "O número da conta de origem, número de conta de destino, valor do saque e senha são obrigatórios!" });
    }

    // VERIFICA SE A CONTA BANCÁRIA DE ORIGEM EXISTE
    if (!numero_conta_origem || numero_conta_origem <= 0) {
        return res.status(400).json({ mensagem: 'Número de conta de origem informado é inválido!' });
    }

    const verificaContaOrigem = contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem);
    });

    if (!verificaContaOrigem) {
        return res.status(404).json({ mensagem: "Não existe conta cadastrada na conta de origem informada!" });
    }

    // VERIFICA SE A CONTA BANCÁRIA DE DESTINO EXISTE
    if (!numero_conta_destino || numero_conta_destino <= 0) {
        return res.status(400).json({ mensagem: 'Número de conta de destino informado é inválido!' });
    }

    const verificaContaDestino = contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino);
    });

    if (!verificaContaDestino) {
        return res.status(404).json({ mensagem: "Não existe conta cadastrada na conta de destino informada!" });
    }

    //VERIFICA DE CONTA DE ORIGEM E DESTINO SÃO DIFERENTES
    if (numero_conta_origem === numero_conta_destino) {
        return res.status(400).json({ mensagem: 'Número de conta de origem e de destino não podem ser iguais!' });
    }

    // VERIFICA SE A SENHA É VÁLIDA PARA A CONTA DE ORIGEM INFORMADA
    const verificaConta = contas.find((conta) => {
        return conta.numero === numero_conta_origem;
    });

    if (verificaConta.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha digitada é inválida para a conta de origem!" })
    }

    // VERIFICA SE HÁ SALDO DISPONÍVEL NA CONTA DE ORIGEM PARA A TRANSFERÊNCIA
    if (verificaConta.saldo <= valor) {
        return res.status(400).json({ mensagem: "Não há saldo suficiente para a transferencia solicitada!" })
    }

    // SUBTRAI O VALOR DA TRANSFÊNCIA DO SALDO NA CONTA DE ORIGEM
    verificaConta.saldo -= Number(valor);

    // SOMAR O VALOR DA TRANSFERÊNCIA NO SALDO DA CONTA DE DESTINO
    verificaContaDestino.saldo += Number(valor);

    const momentoAtual = new Date();
    const data = format(momentoAtual, "yyyy-MM-dd HH:mm:ss");

    const transferenciaParaDestino = {
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(transferenciaParaDestino);
    return res.status(201).json(transferenciaParaDestino);
}

const saldo = (req, res) => {
    // VERIFICA SE NUMERO DE CONTA E SENHA FORAM INFORMADOS
    const { numero_conta, senha } = req.query;
    const contaVerificada = verificaConta(numero_conta, contas);

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "O número da conta e senha são obrigatórios!" });
    }

    // VERIFICA SE A CONTA BANCÁRIA EXISTE
    if (!contaVerificada) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
    }
    //VERIFICA SE A SENHA INFORMADA É VALIDA
    if (contaVerificada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha digitada é inválida!" })
    }

    //EXIBE O SALDO DA CONTA BANCÁRIA
    const exibeSaldo = {
        saldo: contaVerificada.saldo
    }

    return res.status(201).json(exibeSaldo);
}

const extrato = (req, res) => {
    // VERIFICA SE NUMERO DE CONTA E SENHA FORAM INFORMADOS
    const { numero_conta, senha } = req.query;
    const contaVerificada = verificaConta(numero_conta, contas);

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "O número da conta e senha são obrigatórios!" });
    }

    // VERIFICA SE A CONTA BANCÁRIA EXISTE
    if (!contaVerificada) {
        return res.status(404).json({ mensagem: "Não existe usuário cadastrado no número informado!" })
    }

    //VERIFICA SE A SENHA INFORMADA É VALIDA
    if (contaVerificada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha digitada é inválida!" })
    }

    //EXIBE A LISTA DE TRANSFERENCIAS, DEPÓSITOS E SAQUES DA CONTA
    const extratoConta = transferenciaEfetuada({ saques, depositos, transferencias }, numero_conta);
    return res.status(201).json(extratoConta);

}

module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}