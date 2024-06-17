import bcript from 'bcrypt'

export const register = async (req, res) =>{
    const { username, email, password } = req.body;

    const hashedPassword = await bcript.hash(password, 10);
    
    console.log(username);
    console.log(email);
    console.log(hashedPassword);
}
export const login = (req, res) =>{
    
}
export const logout = (req, res) =>{
    
}