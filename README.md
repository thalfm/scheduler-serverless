# ggeducacional/sigeco-promocao-serverless

### Tecnologias utilizadas

<a href="https://www.serverless.com/framework/docs/"><img height="25" src="https://img.shields.io/badge/serverless-f55650.svg?&style=for-the-badge&logo=serverless&logoColor=white"></img></a>
<a href="https://nodejs.org/docs/latest-v12.x/api/"><img height="25" src="https://img.shields.io/badge/nodejs-00b300.svg?&style=for-the-badge&logo=node.js&logoColor=white"></img></a>
<a href="https://docs.aws.amazon.com/index.html"><img height="25" src="https://img.shields.io/badge/AWS-212d3d.svg?&style=for-the-badge&logo=amazon&logoColor=white"></img></a>


### Instalação da API

Você deve instalar o `serverless` e o `serverless-offline` de forma global

```
 npm i -g serverless serverless-offline
```

E instalar as dependências

```
 npm install
```

### Rodando a aplicação

```
 npm start
```

### Versionamento

- [Convenção de versionamento de código](https://bitbucket.org/ggeducacional/knowledge-base/wiki/ConventionalCommitsMessages)
- [Workflow](https://bitbucket.org/ggeducacional/knowledge-base/wiki/GitFLow)

##  Arquivos e pastas

O Projeto é modularizado de tal forma que facilita a inserção e a manutenção dos handlers.

### Pastas:

- `config`: Pasta que é responsável por ter os arquivos de configuração do projeto.
- `handlers`: Aqui estão os arquivos que são os handlers do projeto. Neste pasta haverá um pasta para cada recurso.
- `libs`: Conexões e requests que não são do banco devem ser inseridas nesta pasta: Axios, AWS.

### Arquivos

- `serveless.yml`: Este arquivo é responsável pelo deploy dos handlers no lambda da AWS. Cada handler terá uma configuração específica. Se um handler for criado deverá ser criado uma nova função aqui com as respectivas configurações.
