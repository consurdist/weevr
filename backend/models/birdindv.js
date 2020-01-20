const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    var BirdIndv = sequelize.define('bird_indv', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true
        },
        first_sighting: {
            type: Sequelize.DATE
        },
        recent_sighting: {
            type: Sequelize.DATE
        }
    });

    // Class Method
    BirdIndv.associate = function (models) {
        // species_id = Column(Integer(), ForeignKey("bird_species.id"))
        BirdIndv.hasOne(models.bird_species, {as: 'species_id', foreignKey: 'id' });
    };
    return BirdIndv
};