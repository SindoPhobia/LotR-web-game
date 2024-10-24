import { PageProps } from '@/types';

export default function Welcome({
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <div className='p-8'>
            <div className='pb-16'>
                <h1 className='font-black text-3xl'>Lord of the Rings Card Game</h1>
            </div>

            <p className='font-black text-lg'>Navigate to:</p>
            <ul className='list-["-"] list-inside'>
                <li><a href={route('card-demo')} className='text-blue-600'>Card Demo</a></li>
            </ul>
        </div>
    );
}
