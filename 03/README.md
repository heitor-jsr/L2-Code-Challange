<h1 align="center">
	<img
		width="450"
		alt="The Lounge"
		src="https://media-exp1.licdn.com/dms/image/C560BAQHVrsIoVsqvEw/company-logo_200_200/0/1648478036420?e=2147483647&v=beta&t=bWUf4eZ7M2isokXWBiLPRrO_cp0Rl26FWyzBfDl90rU">
</h1>

<h3 align="center">
	<strong>Bank CRUD API created for the L2 Challenge - Trainee Program  </strong>
</h3>

<p align="center">
	<img src="https://github.com/heitor-jsr/L2-Code-Challange/blob/main/03/imgs/paid.png" width="550">
	<img src="https://github.com/heitor-jsr/L2-Code-Challange/blob/main/03/imgs/debt.png" width="550">
</p>

## **Overview**

- **Complete bank client registration with all CRUD operations.**
- **Easy to run.** Docker, docker-compose and postgres-migrations to make it easier.

## **Pre-requisites**
- [Node](https://nodejs.org/en/download/), version 16.17 or above preferred;
- [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/);
## **Instructions**

All the dependencies for running the project can be installed via npm install.

First, we need to run docker-compose up to create our database:

```sh
docker-compose up
```

If you want, you can check the tables created and their relations with any softwares like DBeaver (search for the ER Diagrama for your database):

<p align="center">
	<img src="https://github.com/heitor-jsr/L2-Code-Challange/blob/main/03/imgs/dbeaver-exemple.png" width="550">
</p>

Next, we need to populate our tables. This can be made using any SQL software manipulator. For this project, i used DBeaver. You can populate the tables with the POST methods created for this CRUD too.

If you choose to populate it with a SQL software, heres some quick inserts scripts:

```sh
INSERT INTO contratos (ID, VALOR_PARCELA, PARCELAS) VALUES(1, 150, 100);
INSERT INTO contratos (ID, VALOR_PARCELA, PARCELAS) VALUES(2, 300, 48);
INSERT INTO contratos (ID, VALOR_PARCELA, PARCELAS) VALUES(3, 500, 24);
INSERT INTO contratos (ID, VALOR_PARCELA, PARCELAS) VALUES(4, 1000, 12);

INSERT INTO PESSOAS (ID, NOME, CONTRATO_ID, INADIMPLENTE) VALUES(1, 'Cristian Ghyprievy', 2, 'S');
INSERT INTO PESSOAS (ID, NOME, CONTRATO_ID, INADIMPLENTE) VALUES(2, 'Joana Cabel', 1, 'S');
INSERT INTO PESSOAS (ID, NOME, CONTRATO_ID, INADIMPLENTE) VALUES(3, 'John Serial', 3, 'S');
INSERT INTO PESSOAS (ID, NOME, CONTRATO_ID, INADIMPLENTE) VALUES(4, 'Michael Seven', 2, 'N');
INSERT INTO PESSOAS (ID, NOME, CONTRATO_ID, INADIMPLENTE) VALUES(5, 'Michael Seven', 2, 'S');

INSERT INTO PAGAMENTOS (ID, PESSOA_ID, DT_PAGAMENTO) VALUES(1, 4, '2021-09-01');
INSERT INTO PAGAMENTOS (ID, PESSOA_ID, DT_PAGAMENTO) VALUES(2, 3, '2021-09-05');
INSERT INTO PAGAMENTOS (ID, PESSOA_ID, DT_PAGAMENTO) VALUES(3, 1, '2021-09-19');
INSERT INTO PAGAMENTOS (ID, PESSOA_ID, DT_PAGAMENTO) VALUES(4, 2, '2021-09-25');
```

Given the table relations and rules, you need to insert the data into the tables following this sequence: contracts, person and then payments.

## **How it works**

If everything went smoothly enough, you can use [Insomnia](https://insomnia.rest/download) to run the API methods and manipulate the database.

To use the methods, you can user the following comand in the terminal:

```sh
npm run dev
```

This will start our serve. After that, you can enjoy the CRUD.

Just be careful: the docker-compose with our database needs to run the serve. 

Feel free to explore all the features. 
