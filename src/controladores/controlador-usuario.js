let { contas } = require('../bancodedados');
let { verificaCampos, verificaConta } = require('../funcoes/funcoes-usuario')


const listarContasBancarias = (req, res) => {
    try {
        if (contas.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhuma conta bancária encontrada!' })
        }
        return res.status(200).json(contas)
    } catch (erro) {
        return res.status(400).json(erro)
    }

}

const criarContaBancaria = (req, res) => {
    try {
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

        // VERIFICA SE ALGUM CAMPO FOI PREENCHIDO COM ESPAÇOS EM BRANCO OU SE ALGUM CAMPO OBRIGATÓRIO NÃO FOI PREENCHIDO
        if (verificaCampos(req.body) === false) {
            return res.status(400).json({ mensagem: 'Um ou mais campos obrigatórios não foram preenchidos.' })
        }

        //VERIFICA SE O CPF OU O EMAIL JÁ EXISTEM
        const cpfUsuario = contas.find((cpfUsuario) => {
            return cpfUsuario.usuario.cpf == cpf
        })

        const emailUsuario = contas.find((emailUsuario) => {
            return emailUsuario.usuario.email == email
        })

        if (cpfUsuario || emailUsuario) {
            return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' })
        }

        //FAZ O CADASTRO DO USUÁRIO
        const cadastraUsuario = {
            numero: contas.length + 1,
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }

        contas.push(cadastraUsuario);

        return res.status(204).send();
    } catch (erro) {
        return res.status(400).json(erro)
    }
}

const atualizarContaBancaria = (req, res) => {
    try {
        const { numeroConta } = req.params;
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

        //VERIFICA NUMERO DA CONTA
        const contaVerificada = verificaConta(numeroConta, contas)

        // VERIFICA SE ALGUM CAMPO FOI PREENCHIDO COM ESPAÇOS EM BRANCO OU SE ALGUM CAMPO OBRIGATÓRIO NÃO FOI PREENCHIDO
        if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
            return res.status(400).json({ mensagem: 'um ou mais campos obrigatórios não foram preenchidos.' })
        }

        //VERIFICA SE O NUMERO RECEBIDO PELA QUERY É UM NUMERO VÁLIDO
        if (!contaVerificada || contaVerificada <= 0) {
            return res.status(400).json({ mensagem: 'Número de conta informado é inválido.' })
        }

        if (!contaVerificada) {
            return res.status(404).json({ mensagem: "Não existe usuário cadastrado no número informado" })
        }

        //VERIFICA SE O CPF OU O EMAIL JÁ EXISTEM
        const cpfUsuario = contas.find((cpfUsuario) => {
            return cpfUsuario.usuario.cpf == cpf
        })
        const emailUsuario = contas.find((emailUsuario) => {
            return emailUsuario.usuario.email == email
        })


        if (cpfUsuario && cpfUsuario.numero !== contaVerificada.numero) {
            return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf informado!' })
        }

        if (emailUsuario && emailUsuario.usuario.email !== contaVerificada.usuario.email) {
            return res.status(400).json({ mensagem: 'Já existe uma conta com o e-mail informado!' })
        }

        if (
            nome === contaVerificada.usuario.nome && cpf === contaVerificada.usuario.cpf && data_nascimento === contaVerificada.usuario.data_nascimento && telefone === contaVerificada.usuario.telefone && email === contaVerificada.usuario.email && senha === contaVerificada.usuario.senha
        ) {
            return res.status(400).json({ mensagem: 'Todos os dados informados são iguais aos originais, nada foi alterado!' })
        }


        //SALVA AS ALTERAÇÕES
        contaVerificada.usuario.nome = nome;
        contaVerificada.usuario.cpf = cpf;
        contaVerificada.usuario.data_nascimento = data_nascimento;
        contaVerificada.usuario.telefone = telefone;
        contaVerificada.usuario.email = email;
        contaVerificada.usuario.senha = senha;


        return res.status(204).send();

    } catch (erro) {
        return res.status(400).json(erro)
    }
}

const excluirContaBancaria = (req, res) => {
    try {
        const { numeroConta } = req.params;

        //VERIFICA NUMERO DA CONTA
        const contaVerificada = verificaConta(numeroConta, contas)

        if (contaVerificada === false) {
            return res.status(404).json({ mensagem: "Não existe usuário cadastrado no número informado" })
        }

        //VERIFICA SE SALDO DA CONTA É IGUAL A ZERO
        if (contaVerificada.saldo !== 0) {
            return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
        }

        //REMOVE A CONTA DO USUÁRIO
        contas = contas.filter((conta) => {
            return conta.numero !== Number(numeroConta)
        })

        return res.status(204).json()

    } catch (error) {
        return res.status(400).json(erro)
    }
}


module.exports = {
    listarContasBancarias,
    criarContaBancaria,
    atualizarContaBancaria,
    excluirContaBancaria
}

