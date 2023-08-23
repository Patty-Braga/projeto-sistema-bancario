# Projeto Sistema Bancário

## Sobre:

Sistema de bancário com operações CRUD, desenvolvida com a linguagem Javascript.
Para utilizar este projeto será preciso liberar a porta 3000 (ou outra que vc prefira, mas será necessário alterar o código), e iniciar o servidor. Aqui foi utilizado o programa Insomnia para realizar os testes, mas você pode utiliza-lo direto de seu navegador utilizando os links descritos a seguir.

### Realiza as seguintes funções:

- Listar todas as contas: http://localhost:3000/contas?senha_banco=Cubos123Bank
- Criar Contas: http://localhost:3000/contas
- Alterar Usuário: http://localhost:3000/contas/1/usuario
- Deletar Usuário: http://localhost:3000/contas/2
- Depósito: http://localhost:3000/transacoes/depositar
- Saque: http://localhost:3000/transacoes/sacar
- Transferência: http://localhost:3000/transacoes/transferir
- saldo: http://localhost:3000/contas/saldo?numero_conta=1&senha=12342
- Extrato: http://localhost:3000/contas/extrato?numero_conta=1&senha=12342


</br>

## Listar todas as contas:

São listadas todas as contas de usuários cadastrados. </br>

![](./imagens/listar_contas.gif)


## Criar contas:

Criada novas contas e as adiciona às contas de usuários existentes. </br>

![](./imagens/criar-conta.gif)


## Alterar usuário:

Altera dados de usúarios já cadastrados, desde que seu cpf e e-mail não constem em outra conta. </br>

![](./imagens/alterar-usuario.gif)


## Deletar usuário:

Deleta usuário cadastrado, desde que o saldo da conta seja igual a zero. </br>

![](./imagens/deletar-usuario.gif)


## Depósito:

Realiza depósito para as contas já cadastradas. </br>

![](./imagens/deposito.gif)


## Saque:

Realiza depósito para as contas já cadastradas. </br>

![](./imagens/deposito.gif)


## Transferência:

Realiza transferência de valores entre as contas já cadastradas. </br>

![](./imagens/transferir.gif)


## Saldo:

Faz conferência do saldo da conta. </br>

![](./imagens/saldo.gif)


## Extrato:

Devolve, na tela, toda a movimentação feita pela conta informada. </br>

![](./imagens/extrato.gif)


</br>

## Tecnologias utilizadas:

<div style="display: inline_block"></br>

  <div style="display: inline_block">
  <img align="center" alt="Js" height="50" width="60" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="Js" height="50" width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
  <img align="center" alt="Js" height="55" width="55" src="https://seeklogo.com/images/I/insomnia-logo-A35E09EB19-seeklogo.com.png">
          
          
</div>