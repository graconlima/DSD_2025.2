const http = require("http");

let contador = 0; // Simula dados mudando ao longo do tempo

const servidor = http.createServer((req, res) => {
  // Habilita CORS para facilitar testes no navegador
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/dados") {
    contador++; // Cada requisição gera “dados novos”
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ valor: contador }));
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

servidor.listen(3000, () => {
  console.log("Servidor Polling rodando em http://localhost:3000");
});
