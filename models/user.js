import mongoose from 'mongoose'
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  email: {
    type: String,
    required: [true, 'El email es necesario'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es necesaria']
  },
  date: {
    type: Date,
    default: Date.now()
  },
  role: {
    type: String,
    default: 'USER',
    enum: {
      values: [
        'ADMIN',
        'USER',
      ],
      message: '{VALUE} no es un rol válido'
    }
  },
  active: {
    type: Boolean,
    default: true
  }
})

userSchema.plugin(uniqueValidator, { message: '{PATH} tiene que ser único.' });

userSchema.methods.toJSON = function () {
  const object = this.toObject();
  delete object.password;
  return object;
}

const User = mongoose.model('User', userSchema);

export default User