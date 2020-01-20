const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    var InputDetails = sequelize.define("bird_input_details", {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true
        },
        input_type: {
            type: Sequelize.STRING,
            validate: {
                len: [20]
            }
        },
        location_x: {
            type: Sequelize.NUMBER
        },
        location_y: {
            type: Sequelize.NUMBER
        },
        url: {
            type: Sequelize.STRING,
            validate: {
                len: [1, 300]
            }
        },
        name_value: {
            type: Sequelize.STRING,
            validate: {
                len: [1, 300]
            }
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
            // define the table's name
            tableName: 'bird_input_details'
        }
    );

    // Class Method
    InputDetails.associate = function (models) {
        // input_userid = Column(Integer(), ForeignKey("users.id"))
        InputDetails.hasOne(models.user, {as: 'input_userid', foreignKey: 'id'});

        // entries = db.relationship('BirdEntry', backref='create_from', lazy=True)
        InputDetails.hasMany(models.bird_entry,{ foreignKey: 'input_details' });
    };
    return InputDetails
};