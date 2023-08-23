let { contas } = require('../bancodedados');

// VERIFICA SE ALGUM CAMPO FOI PREENCHIDO COM ESPAÇOS EM BRANCO OU SE ALGUM CAMPO OBRIGATÓRIO NÃO FOI PREENCHIDO
const verificaCampos = ({ nome, cpf, data_nascimento, telefone, email, senha }) => {
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return false;
    }

    if (nome.trim() === "" || cpf.trim() === "" || data_nascimento.trim() === "" || telefone.trim() === "" || email.trim() === "" || senha.trim() === "") {
        return false;
    }
    return true;
}

const verificaConta = (numeroConta, contas) => {
    const contaVerificada = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });
    return contaVerificada;
}


module.exports = {
    verificaCampos,
    verificaConta
}

