module.exports = function(sequelize, DataTypes) {
    let Artist = sequelize.define('Artist', {
        'name': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'validate': {
                'len': [1,255]
            }
        },
        'description': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'validate': {
                'len': [1, 255]
            }
        }
    });

    return Artist;
}
