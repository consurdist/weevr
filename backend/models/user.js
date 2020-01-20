const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    var User = sequelize.define("user", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                AllowNull: false,
                unique: true
            },
            first_name: {
                type: Sequelize.STRING,
                validate: {
                    len: [1, 30]
                }
            },
            last_name: {
                type: Sequelize.STRING,
                validate: {
                    len: [1, 30]
                }
            },
            phone: {
                type: Sequelize.STRING,
                validate: {
                    len: [1, 30]
                }
            },
            email: {
                type: Sequelize.STRING,
                validate: {
                    len: [1, 60]
                },
                unique: true
            },
            confirmation: {
                type: Sequelize.BOOLEAN,
                default: false
            },
            paid: {
                type: Sequelize.BOOLEAN,
                default: false
            },
            _password: {
                type: Sequelize.STRING,
                validate: {
                    len: [6, 128]
                }
            },
            payment_plan: {
                type: Sequelize.INTEGER
            },
            renewal_date: {
                type: Sequelize.DATE
            },
            free_ids: {
                type: Sequelize.INTEGER
            },
            created_at: {
                type: Sequelize.DATE
            },
        },
        {
            timestamps: false
        }
    );

    // Class Method
    User.associate = function (models) {
        // entries = db.relationship('BirdEntry', backref='my_sightings', lazy=True)
        User.hasMany(models.bird_entry, {as: 'entries', foreignKey: 'id'});
    };
    return User
};