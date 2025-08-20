import bcrypt from "bcrypt";

// 哈希密码
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // 越大越安全，但也越慢
    return await bcrypt.hash(password, saltRounds);
}

// 校验密码
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}
