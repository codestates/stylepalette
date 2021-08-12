'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tb_like', {
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            postId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'posts',
                    key: 'id',
                },
            },
        });
        await queryInterface.addConstraint('tb_like', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'FK_from_user',
            references: {
                table: 'users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('tb_like', {
            fields: ['postId'],
            type: 'foreign key',
            name: 'FK_from_post',
            references: {
                table: 'posts',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('tb_like', 'FK_from_post');
        await queryInterface.removeConstraint('tb_like', 'FK_from_user');
        await queryInterface.dropTable('tb_like');
    },
};
