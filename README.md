# Mini Projeto JavaScript: Gerenciador de Tarefas com JSON Server

Este é um mini projeto em JavaScript que utiliza o JSON Server como backend para gerenciar tarefas. O projeto permite buscar tarefas por título, criar novas tarefas e excluir tarefas existentes.

## Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes requisitos instalados em sua máquina:

-   **Node.js** (v14.x ou superior): [https://nodejs.org/]()
-   **npm** (normalmente instalado com o Node.js): [https://www.npmjs.com/]()
-   **json-server** (para simular uma API REST): [https://github.com/typicode/json-server]()

## Instalação

### Clone o repositório

```
`git clone https://github.com/Oliveira-Carlos/Mini-projeto-to-do-list
```

### Instale as dependências do projeto

```
`npm install
```

## Executando o Projeto

### Inicie o JSON Server

```
`npx json-server api.json --watch --port3000
```

### Inicie a aplicação

Inicie a aplicação com live server ou abra o arquivo `index.html` em seu navegador.

## Funcionalidades

-   **Buscar tarefas por título** : Encontre tarefas rapidamente com nossa funcionalidade de busca.
-   **Criar novas tarefas** : Adicione novas tarefas à sua lista com facilidade.
-   **Excluir tarefas existentes** : Remova tarefas concluídas ou desnecessárias.

## Estrutura do Projeto

-   **`index.html`** : Página principal da aplicação.
-   **`style.css`** : Estilos CSS para a aplicação.
-   **`app.js`** : Código JavaScript principal.
-   **`api.json`** : Arquivo utilizado pelo JSON Server para simular o banco de dados.

## Licença

Este projeto está licenciado sob a [MIT License]().
