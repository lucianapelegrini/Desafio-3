'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pedido.belongsTo(models.Cliente, {foreignKey: 'ClienteId', as: 'cliente'});
      Pedido.belongsToMany(models.Servico, {foreignKey: 'PedidoId', through: 'ItemPedido', as: 'servico_ped'});
      Pedido.hasMany(models.ItemPedido, {foreignKey: 'PedidoId', as: 'Item_pedido'});    
    }
  };
  Pedido.init({
    data: DataTypes.DATEONLY,
    ClienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};