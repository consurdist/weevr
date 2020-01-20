const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    var BirdSpecies = sequelize.define('bird_species', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true
        },
        avibase_id: {
            type: Sequelize.STRING,
            validate: {
                len: [1,300]
            },
            unique: true
        },
        common_name: {
            type: Sequelize.STRING,
            validate: {
                len: [1,300]
            },
            unique: true
        },
        order: {
            type: Sequelize.STRING,
            validate: {
                len: [1,300]
            },
        },
        order_common: {
            type: Sequelize.STRING,
            validate: {
                len: [1,300]
            },
        },
        family: {
            type: Sequelize.STRING,
            validate: {
                len: [1,300]
            },
        },
        family_common: {
            type: Sequelize.STRING,
            validate: {
                len: [1,300]
            },
        },
        genus: {
            type: Sequelize.STRING,
            validate: {
                len: [1,300]
            },
        },
        genus_common: {
            type: Sequelize.STRING,
            validate: {
                len: [1,300]
            },
        },
        species: {
            type: Sequelize.STRING,
            validate: {
                len: [1,300]
            },
        },
        bird_details: {
            type: Sequelize.STRING,
            validate: {
                len: [1,1000]
            },
        },
        img_path: {
            type: Sequelize.STRING,
            validate: {
                len: [1,300]
            },
        },
        rarity: {
            type: Sequelize.STRING,
            validate: {
                len: [1,300]
            },
        },


    },
        {
            freezeTableName: true,
            timestamps: false,
            // define the table's name
            tableName: 'bird_species'
        }
    );

    // Class Method
    BirdSpecies.associate = function (models) {
        // entries = db.relationship('BirdEntry', backref='this_species', lazy=True)
        BirdSpecies.hasMany(models.bird_entry, { foreignKey: 'species_id'});
    };
    return BirdSpecies

};