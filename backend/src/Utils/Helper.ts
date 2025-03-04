import bcrypt from "bcryptjs"

export const PasswordHasher = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword; 
    } catch (error) {
        throw new Error('Error hashing password'); 
    }
};

export const PasswordComparer = async (plain: string,hashed:string) => {
    const isMatch = await bcrypt.compare(plain, hashed);
    return isMatch
}
