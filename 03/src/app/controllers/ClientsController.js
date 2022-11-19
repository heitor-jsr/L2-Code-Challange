const ClientsRepository = require('../repositories/ClientsRepository');

class ClientController {
  async index(request, response) {
    const contacts = await ClientsRepository.findAll();
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const cliente = await ClientsRepository.findById(id);
    if (!cliente) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(cliente);
  }

  async showContract(request, response) {
    const { id } = request.params;
    const contract = await ClientsRepository.findContract(id);
    if (!contract) {
      return response.status(404).json({ error: 'Contract not found' });
    }
    response.json(contract);
  }

  async storeContract(request, response) {
    const { id, valor_parcela, parcelas } = request.body;

    if (!id) {
      return response.status(400).json({ error: 'Id is required' });
    }

    const contractExists = await ClientsRepository.findContract(id);

    if (contractExists) {
      return response.status(400).json({ error: 'This contract already exists' });
    }

    const createContract = await ClientsRepository.create({
      id, valor_parcela, parcelas,
    });

    response.json(createContract);
  }

  async store(request, response) {
    const { id, nome, contrato_id, inadimplente, dt_completo } = request.body;

    if (!nome) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const clientetExists = await ClientsRepository.findByName(nome);

    if (clientetExists) {
      return response.status(400).json({ error: 'This cliente is already in our database' });
    }

    const createCliente = await ClientsRepository.create({
      id, nome, contrato_id, inadimplente, dt_completo,
    });

    response.json(createCliente);
  }

  async store(request, response) {
    const { id, pessoa_id, dt_pagamento } = request.body;

    if (!id) {
      return response.status(400).json({ error: 'Payment id is required' });
    }

    const paymentExists = await ClientsRepository.findPayment(id);

    if (paymentExists) {
      return response.status(400).json({ error: 'This payment is already in our database' });
    }

    const createPayment = await ClientsRepository.createPayment({
      id, pessoa_id, dt_pagamento,
    });

    response.json(createPayment);
  }

  async paid (request, response) {
    const { id, nome, contrato_id, inadimplente, dt_completo } = request.body;
    const paidContract = await ClientsRepository.findPplWhoPaid();
    response.json(paidContract);
  }

  async inDebt(request, response) {
    const { id, nome, contrato_id, inadimplente, dt_completo } = request.body;
    const peopleInDebt = await ClientsRepository.checkPeoplePayments();
    response.json(peopleInDebt);
  }

  async update(request, response) {
    const { id } = request.params;
    const { nome, contrato_id, inadimplente, dt_completo } = request.body;

    const contactById = await ClientsRepository.findById(id);

    if (!contactById) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!nome) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const clientetExists = await ClientsRepository.findByName(nome);

    if (clientetExists && clientetExists.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ClientsRepository.update(id, {
      nome, contrato_id, inadimplente, dt_completo
    });
    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ClientsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ClientController();
