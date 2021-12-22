'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ItemPedido', {
      PedidoId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'Pedido',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
        
      },
      ServicoId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'Servico',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
        
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ItemPedido');
  }
};