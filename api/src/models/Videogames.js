const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogames', {
    id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4 ,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  platforms:{
    type:DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
   },
   released: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.STRING,
  },
  background_image: {
    type: DataTypes.STRING,
    defaultValue:"https://www.nicepng.com/png/full/98-980546_coin-mario-bros-png.png"
  },
  createdDb:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    DefaulValue : true
  },
  },{
    timestamps: false
  });
};
