module.exports =async function(sequelize, DataTypes) {
  const Products = sequelize.define("Products", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
//  await Products.create({
//       name:"",
//       amount:"",
//       imgUrl:""
//   })
  return Products;
};
