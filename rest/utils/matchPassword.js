import bcrypt from 'bcrypt';

const matchPassword = async (userPassword, enteredPassword) => {
    return await bcrypt.compare(enteredPassword, userPassword);
};

export default matchPassword;