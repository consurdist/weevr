const Sequelize = require("sequelize");
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const mariadb = require('mariadb');
require("dotenv").config()

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// const sequelize = new Sequelize(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, {
//     user: 'admin', pass: 's1mpl3', dialect: 'mariadb', database: 'database_development'
// });

// async function connectDB() {
//     let conn;
//     try {
//         conn = await pool.getConnection();
//     } catch (err) {
//         throw err;
//     } finally {
//         // if (conn) conn.release(); //release to pool
//         if (conn) console.log("connected to DB")
//     }
// }


const User = sequelize.define("user", {
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

// entries = db.relationship('BirdEntry', backref='my_sightings', lazy=True)
User.hasMany(this.BirdEntry, {as: 'entries', foreignKey: 'my_sightings'});




// -- BirdEntry -- this is the log of birds identified
const BirdEntry = sequelize.define("bird_entry", {
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
    }
}
);

// user_id = Column(Integer(), ForeignKey("users.id"), nullable=False)
BirdEntry.belongsTo(this.User,{as: 'user_id', foreignKey: 'users.id' });

// bird_indv_id = Column(Integer(), ForeignKey("bird_indv.id"),)
BirdEntry.hasOne(this.BirdIndv, {as: 'bird_indv_id', foreignKey: 'bird_indv.id'});

// species_id = Column(Integer(), ForeignKey("bird_species.id"), nullable=False)
BirdEntry.hasOne(this.BirdSpecies, {as: 'species_id', foreignKey: 'bird_species.id'});

// input_details = Column(Integer(), ForeignKey("bird_input_details.id"),  nullable=False)
BirdEntry.hasOne(this.InputDetails, { as: 'input_details', foreignKey: 'bird_input_details.id'});




// -- InputDetails -- describes an input vector, be it webcam, file upload etc
const InputDetails = sequelize.define("bird_input_details", {
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
});

// input_userid = Column(Integer(), ForeignKey("users.id"))
InputDetails.hasOne(this.User, {as: 'input_userid', foreignKey: 'user.id'});

// entries = db.relationship('BirdEntry', backref='create_from', lazy=True)
InputDetails.belongsTo(this.BirdEntry,{ as: 'entries', foreignKey: 'create_from' });




// -- BirdSpecies -- describes a bird species and its info
const BirdSpecies = sequelize.define('bird_species', {
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
        }
    }

});

// entries = db.relationship('BirdEntry', backref='this_species', lazy=True)
BirdSpecies.belongsTo(this.BirdEntry);




// -- BirdIndv -- describes individual birds
const BirdIndv = sequelize.define('bird_indv', {
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

// species_id = Column(Integer(), ForeignKey("bird_species.id"))
BirdIndv.hasOne(this.BirdSpecies, {as: 'species_id', foreignKey: 'bird_species.id' });

// entries = db.relationship('BirdEntry', backref='this_bird', lazy=True)




module.exports = {User, BirdEntry, InputDetails, BirdIndv, BirdSpecies};










__repr__ = () => {
    return User(this.first_name, this.last_name, this.email, this.id)
};

// set_pw = (password) => {
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//         bcrypt.hash(password, salt, function(err, hash) {
//             return hash
//         });
//     });
// };

// check_pw = (password, db_hash) => {
//     bcrypt.compare(password, db_hash, function(err, res) {
//         // res == true
//     });
// };


// export default User

// entries = db.relationship('BirdEntry', backref='my_sightings', lazy=True)

// stream_port_A = db.Column(Integer())
// stream_port_B = db.Column(Integer())


