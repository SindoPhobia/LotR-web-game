import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useBasicStore } from '@/Store/basic_store';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Profile/Partials/DeleteUserForm';

export default function Dashboard(props: any) {
    console.log(props)
    const { value, increment, decrement } = useBasicStore();
    return (
        <AuthenticatedLayout
            header={
                <h2 onClick={increment} className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard {value}
                </h2>
            }
        >
            <Head title="Dashboardyolo" />
            <DeleteUserForm/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in! {'' ?? '123'}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
