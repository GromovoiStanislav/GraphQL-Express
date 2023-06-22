import Sequelize from 'sequelize';
import {faker} from '@faker-js/faker';
import _ from 'lodash';


// const Conn = new Sequelize(
//     'mydb',
//     'postgres',
//     'root',
//     {
//         dialect: 'postgres',
//         host: 'localhost'
//     },
//     {
//         logging: false,
//     }
// );

const Conn = new Sequelize('postgres://postgres:root@localhost:5432/mydb', {
        logging: false,
    }
);

const Person = Conn.define('person', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    }
});

const Post = Conn.define('post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Relations
Person.hasMany(Post);
Post.belongsTo(Person);

Conn.sync({force: true}).then(() => {
    _.times(10, () => {
        return Person.create({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email()
        }).then(person => {
            return person.createPost({
                title: `Sample post by ${person.firstName}`,
                content: 'here is some content'
            });
        });
    });
});

export default Conn;