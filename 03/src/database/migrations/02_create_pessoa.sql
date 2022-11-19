CREATE TABLE IF NOT EXISTS PESSOAS (
  ID VARCHAR NOT NULL UNIQUE,
  NOME VARCHAR NULL,
  CONTRATO_ID VARCHAR NOT NULL,
  INADIMPLENTE VARCHAR NULL,
  DT_COMPLETO DATE,
  FOREIGN KEY(CONTRATO_ID) REFERENCES CONTRATOS(ID)
);