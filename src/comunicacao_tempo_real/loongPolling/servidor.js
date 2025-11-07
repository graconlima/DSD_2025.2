const http = require("http");

let ultimoValor = 0;
let esperando = []; // Lista de clientes esperando resposta

// A cada 5 segundos, gera um novo valor
setInterval(() => {
  ultimoValor++;
  console.log("Gerando novo valor:", ultimoValor);

  // Responde todos que estavam esperando
  esperando.forEach(res => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ valor: ultimoValor }));
  });

  esperando = [];
}, 5000);

const servidor = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/dados") {
    // Segura a resposta e só envia quando tiver algo novo
    esperando.push(res);
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

servidor.listen(3001, () => {
  console.log("Servidor Long Polling rodando em http://localhost:3001");
});
