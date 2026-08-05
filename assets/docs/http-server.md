# http-server: um servidor HTTP estático simples

É um servidor HTTP estático de linha de comando simples e sem necessidade de configuração. Ele é poderoso o suficiente para uso em produção, mas também é simples e flexível o bastante para ser usado em testes, desenvolvimento local e aprendizado.

## Instalação

Usando este comando no terminal, você instalará a biblioteca `http-server` de forma global. Isso significa que, após a instalação, ela poderá ser executada em qualquer outro projeto criado na mesma máquina, sem a necessidade de reinstalá-lo novamente.

```powershell
npm install -g http-server
```

## Execução

Execute o comando abaixo para criar um servidor http simples para o seu projeto:

```powershell
http-server ./
```

Após executar esse comando, exibirá esta resposta como saída (ou uma resposta muito parecida) se a operação for bem-sucedida.

```powershell
Starting up http-server, serving ./ through https

http-server settings:
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  https://127.0.0.1:8080
  https://192.168.1.101:8080
  https://192.168.1.104:8080
Hit CTRL-C to stop the server
```

---

## Referência

- [Documentação oficial do NPM](https://www.npmjs.com/package/http-server)

---

[Voltar para a seção Tecnologias do README](../../README.md#tecnologias)
