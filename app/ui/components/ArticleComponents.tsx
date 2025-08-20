import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { openSans } from '@/app/ui/fonts';
import Image from 'next/image';

//layout components for articles
export function SectionWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full md:w-2/3 mx-auto bg-white px-6 py-12 lg:px-8 dark:bg-gray-900">
            <div className="mx-auto max-w-3xl text-base/7 text-gray-700 dark:text-gray-300">
                {children}
            </div>
        </div>
    );
}

//Tag component for article sections
export function Tag({ text }: { text: string }) {
    return (
        <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            {text}
        </p>
    );
}

//Main title component for articles
export function MainTitle({ text }: { text: string }) {
    return (
        <h1 className={`${openSans.className} antialiased mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white`}>
            {text}
        </h1>
    );
}


//Summary component for articles
export function Summary({ text }: { text: string }) {
    return <p className="mt-4 text-lg/8">{text}</p>;
}

//Paragraph component for articles
export function Paragraph({ text }: { text: string }) {
    return <p className="mt-4 text-base/6">{text}</p>;
}

//List item component for articles
export function ListItem({ title, description }: { title: string; description: string }) {
    return (
        <li className="flex gap-x-1">
            <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600 dark:text-indigo-400"
            />
            <span>
                <strong className="font-semibold text-gray-900 dark:text-white">{title}</strong> {description}
            </span>
        </li>
    );
}

//SubTitle component for articles
export function SubTitle({ text }: { text: string }) {
    return (
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            {text}
        </h2>
    );
}

//Image component for articles
export function ArticleImage({ width, height, src, alt }: { width: number, height: number, src: string; alt: string }) {
    return (
        <figure className="mt-4">
            <Image width={width} height={height} src={src} alt={alt}
                className="rounded-xl bg-gray-50 object-cover dark:bg-gray-800"
            ></Image>
        </figure>
    );
}
