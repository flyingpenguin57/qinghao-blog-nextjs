'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { AuthLayout } from '@/app/ui/kit/auth-layout'
import { Button } from '@/app/ui/kit/button'
import { Checkbox, CheckboxField } from '@/app/ui/kit/checkbox'
import { Field, Label } from '@/app/ui/kit/fieldset'
import { Heading } from '@/app/ui/kit/heading'
import { Input } from '@/app/ui/kit/input'
import { Strong, Text, TextLink } from '@/app/ui/kit/text'
import { useStore } from '@/app/store/userStore'

interface LoginForm {
    username: string;
    password: string;
}

export default function LoginPage() {

    const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
    const router = useRouter()

    // 输入框变化
    const handleChange = (key: keyof LoginForm, value: string) => {
        setForm({ ...form, [key]: value });
    };

    // 点击登录按钮
    const handleLogin = async () => {
        const res = await fetch('api/auth/login', {
            method: 'POST',                      // ✅ POST 请求
            headers: {
                'Content-Type': 'application/json', // 必须指定 JSON
            },
            body: JSON.stringify(form), // 请求体
        })

        if (res.ok) {
            const body = await res.json();
            console.log(body)
            if (body.success) {
                const user = body.data
                useStore.getState().setUser({
                    username: user?.username,
                    email: user?.email,
                    avator: user?.avator,
                    id: user?.id
                })
                router.push('/') // 登录成功跳首页
            } else {
                alert(body.message)
            }
        }
    };

    return (
        <AuthLayout>
            <form className="grid w-full max-w-sm grid-cols-1 gap-8">
                <Heading>Sign in to your account</Heading>
                <Field>
                    <Label>Email</Label>
                    <Input type="email" name="email" onChange={(e) => handleChange("username", e.target.value)} />
                </Field>
                <Field>
                    <Label>Password</Label>
                    <Input type="password" name="password" onChange={(e) => handleChange("password", e.target.value)} />
                </Field>
                <div className="flex items-center justify-between">
                    <CheckboxField>
                        <Checkbox name="remember" />
                        <Label>Remember me</Label>
                    </CheckboxField>
                    <Text>
                        <TextLink href="#">
                            <Strong>Forgot password?</Strong>
                        </TextLink>
                    </Text>
                </div>
                <Button className="w-full bg-indigo-600 text-white" onClick={handleLogin}>
                    Login
                </Button>
            </form>
        </AuthLayout>
    );
}