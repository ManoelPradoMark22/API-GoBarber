# API GoBarber ![logo](logo-purple.svg)
## API da aplicação GoBarber, desenvolvida em NodeJS durante o Bootcamp GoStack da Rocketseat. Tem como função agendamento de horário para corte de cabelo.
### Esta API foi feita para ser consumida pelo front-end <a href="https://github.com/ManoelPradoMark22/app-Gobarber-WEB">WEB</a> e <a href="https://github.com/ManoelPradoMark22/app-GoBarber-Mobile">Mobile</a> (basta clicar para ser redirecionado aos respectivos repositórios).
Para a aplicação funcionar, siga os passos:
<ul>
<li>Caso não tenha instalado, instale o <a href="https://docs.docker.com/docker-for-windows/install/">Docker</a> na sua máquina e o inicie;</li>
<li>Para adicionar as dependências, execute:
<br />
yarn
</li>
<li>Execute:
<br />
docker ps (para ver se os conteiners gobarber, mongobarber e redisbarber estão em execução)
<br />
Caso não estejam, execute: docker ps -a (para ver se os conteiners citados anteriormente foram criados).
</li>
<li>Caso não existam tais conteiners, crie os containers executando, na raíz do projeto, cada comando a seguir:
<br />
docker run --name gobarber -e POSTGRES_PASSWORD=sua_senha_aqui -p 5432:5432 -d postgres
<br />
docker run --name mongobarber -p 27017:27017 -d -t mongo
<br />
docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
</li>
<li>Para ver se os containers estão rodando execute:
<br />
docker ps
<br />
Este comando mostra todos os containers em execução ("docker ps -a" mostra todos, até os que não estão em execução no momento).
</li>
<li>Caso você tenha parado a execução de algum container, basta executar o comando:
<br />
docker start nome_do_container
<br />
Isso irá iniciar o container em questão.
</li>
<li>Agora em um terminal, na raíz do projeto, execute:
<br />
yarn queue
</li>
<li>E por fim, em outro terminal e também na raíz do projeto, execute:
<br />
yarn dev
</li>
</ul>

# INSOMNIA
<ul>
  <li>Caso não tenha instalado, instale o <a href="https://insomnia.rest/">Insomnia</a>; </li>
  <li>Com o programa aberto, vá em Application/preferences/data/importData e faça o import do arquivo <a href="https://github.com/ManoelPradoMark22/API-GoBarber/blob/master/Insomnia_goBarber.json">Insomnia_goBarber.json</a>;</li>
  <li>Obs: sempre que fizer login na API, copie o token gerado, vá em NoEnvironment/ManageEnvironments e cole o token no local especificado.</li>
</ul>
