'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('posts', 'userId', Sequelize.INTEGER);

        await queryInterface.addConstraint('posts', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'FK_from_post_to_user',
            references: {
                table: 'users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('posts', 'FK_from_post_to_user');
        await queryInterface.removeColumn('posts', 'userId');
    },
};
