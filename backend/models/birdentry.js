const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    var BirdEntry = sequelize.define("bird_entry", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            AllowNull: false,
            unique: true
        },
        time: {
            type: Sequelize.DATE,
            AllowNull: false
        },
        img_path: {
            type: Sequelize.STRING,
            validate: {
                len: [1, 222]
            },
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
        // define the table's name
        tableName: 'bird_entry'
        }
    );

    // Class Method
    BirdEntry.associate = function (models) {
        // user_id = Column(Integer(), ForeignKey("users.id"), nullable=False)
        BirdEntry.belongsTo(models.user,{as: 'user_id', foreignKey: 'id' });

        // bird_indv_id = Column(Integer(), ForeignKey("bird_indv.id"),)
        BirdEntry.hasOne(models.bird_indv, {as: 'bird_indv_id', foreignKey: 'bird_indv.id'});

        // species_id = Column(Integer(), ForeignKey("bird_species.id"), nullable=False)
        BirdEntry.belongsTo(models.bird_species, {as: 'species_id', foreignKey: 'id'});

        // input_details = Column(Integer(), ForeignKey("bird_input_details.id"),  nullable=False)
        BirdEntry.belongsTo(models.bird_input_details, { as: 'input_details', foreignKey: 'id'});
    };

    return BirdEntry
};


