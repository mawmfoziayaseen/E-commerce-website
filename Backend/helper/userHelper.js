import bcrypt from 'bcrypt';



const encryptPassword = async (plainPassword) => {
    const saltRound = 10;
    const encryptPassword = await bcrypt.hash(plainPassword, saltRound);
    return encryptPassword;
}
const matchPassword = async (userPassword, hashedPassword)=>
{
    return bcrypt.compare(userPassword, hashedPassword);
}

export { encryptPassword ,matchPassword};