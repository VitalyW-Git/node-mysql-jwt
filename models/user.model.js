import { DataTypes } from 'sequelize';
import sequelize from './connection.js'

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
        name: {
        type: DataTypes.STRING 
    },
    email: {
        type: DataTypes.STRING,
        validate:{
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING 
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}); 
export default User;
