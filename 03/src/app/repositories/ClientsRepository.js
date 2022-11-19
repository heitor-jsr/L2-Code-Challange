const db = require('../../database');


let contacts = [

];

class ClientsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT pessoas.*
    FROM pessoas
    ORDER BY pessoas.nome ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT pessoas.*
    FROM pessoas
    WHERE pessoas.id = $1
    `, [id]);
    return row
  }

  async findPayment(id) {
    const [row] = await db.query(`
    SELECT pagamentos.*
    FROM pagamentos
    WHERE pagamentos.id = $1
    `, [id]);
    return row
  }

  async findContract(id) {
    const [row] = await db.query(`
    SELECT contratos.*
    FROM contratos
    WHERE contratos.id = $1
    `, [id]);
    return row
  }

  async findByName(nome) {
    const [row] = await db.query('SELECT * FROM PESSOAS WHERE nome = $1', [nome]);
    return row
  }

  async checkPeoplePayments() {
    const row = await db.query(`
    SELECT NOME, EXTRACT(DAY FROM DT_PAGAMENTO) as DIA_MES, VALOR_PARCELA
    FROM PESSOAS
    JOIN PAGAMENTOS ON (PAGAMENTOS.PESSOA_ID = PESSOAS.ID) JOIN CONTRATOS ON (CONTRATOS.ID = PESSOAS.CONTRATO_ID)
    WHERE pessoas.INADIMPLENTE = 'S'
    `,)
    return row
  }
    
  async findPplWhoPaid() {
    const row = await db.query(`
    SELECT NOME, ((cast (CONTRATOS.VALOR_PARCELA as INT)) * (cast (CONTRATOS.PARCELAS as INT))) as VALOR_TOTAL
    FROM PESSOAS
    JOIN CONTRATOS ON (CONTRATOS.ID = PESSOAS.CONTRATO_ID)
    WHERE pessoas.INADIMPLENTE = 'N'
    `);
    return row
  }
  
  async create({ id, nome, contrato_id, inadimplente, dt_completo}) {
    const [row] = await db.query(`
    INSERT INTO pessoas(id, nome, contrato_id, inadimplente, dt_completo) 
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`, [id, nome, contrato_id, inadimplente, dt_completo]);
    return row
  }

  async createContract({ id, valor_parcela, parcelas}) {
    const [row] = await db.query(`
    INSERT INTO contratos(id, valor_parcela, parcelas) 
    VALUES($1, $2, $3)
    RETURNING *`, [id, valor_parcela, parcelas]);
    return row
  }

  async createPayment({ id, pessoa_id, dt_pagamento }) {
    const [row] = await db.query(`
    INSERT INTO pagamentos(id, pessoa_id, dt_pagamento) 
    VALUES($1, $2, $3)
    RETURNING *`, [id, pessoa_id, dt_pagamento]);
    return row
  }

  async update(id, { nome, contrato_id, inadimplente, dt_completo, }) {
    const [row] = await db.query(`
      UPDATE pessoas
      SET nome = $1, contrato_id = $2, inadimplente = $3, dt_completo = $4
      WHERE id = $5
      RETURNING *
    `, [nome, contrato_id, inadimplente, dt_completo, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM pessoas WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ClientsRepository();
