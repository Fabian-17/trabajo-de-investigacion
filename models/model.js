const { sequelize, DataTypes } = require('../db');

const Imagen = sequelize.define('Imagen', {   

id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
public_id: {
    type: DataTypes.STRING,
},
url: {
    type: DataTypes.STRING,
    allowNull: false
},
nombre_original: {
    type: DataTypes.STRING,
    allowNull: false
},
 createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
},
updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
},
deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
}
}, {

    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'Imagen'
});


Imagen.sync();

module.exports = Imagen;   