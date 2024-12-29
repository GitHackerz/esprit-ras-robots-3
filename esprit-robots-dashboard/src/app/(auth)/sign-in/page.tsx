import { LoginForm } from "./_components/login-form"


export default function LoginPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <h1 className="flex items-center gap-2 self-center text-center text-2xl font-bold">
                    
                    ESPRIT RAS ROBOTS 3.0
                </h1>
                <LoginForm />
            </div>
        </div>
    )
}
