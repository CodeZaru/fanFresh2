module.exports = function(sequelize, DataTypes) {
    let Selection = sequelize.define('Selection', {
        'selected': {
            'type': DataTypes.BOOLEAN,
            'defaultValue': false,
        }
    });

    Selection.associate = function(models) {
        Selection.belongsTo(models.Artist, {
            'foreignKey': {
                'allowNull': false
            },
            'onDelete': "cascade"
        });
    }

    return Selection;
}
