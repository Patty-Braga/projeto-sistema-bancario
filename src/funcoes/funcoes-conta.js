let { contas } = require('../bancodedados');

// VERIFICA SE A SENHA É VALIDA
const verificaSenha = ({ senha }) => {
    const verificaSenha = contas.find((conta) => {
        return conta.usuario.senha === senha;
    });

    if (!verificaSenha) {
        return false;
    }
    return true;
}

//VERIFICA SE A CONTA INFORMADA EXISTE
const verificaConta = (numero_conta, contas) => {
    const contaVerificada = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });
    return contaVerificada;
}

//FAZ A TRANSFERENCIA ENTRE AS CONTAS
const transferenciaEfetuada = ({ saques, depositos, transferencias }, numero_conta) => {
    const extratoDepositoEfetuado = depositos.filter((item) => {
        return item.numero_conta === Number(numero_conta)
    });

    const extratoSaqueEfetuado = saques.filter((item) => {
        return item.numero_conta === Number(numero_conta)
    });

    const extratoTransferenciaEfetuada = transferencias.filter((item) => {
        return item.numero_conta_origem === Number(numero_conta)
    });

    const extratoTransferenciaRecebida = transferencias.filter((item) => {
        return item.numero_conta_destino === Number(numero_conta)
    });

    const extratoDaConta = {
        depositos: extratoDepositoEfetuado,
        saques: extratoSaqueEfetuado,
        transferencias: {
            enviadas: extratoTransferenciaEfetuada,
            recebidas: extratoTransferenciaRecebida,
        }
    }

    return extratoDaConta;
}


module.exports = {
    verificaSenha,
    transferenciaEfetuada,
    verificaConta,
}