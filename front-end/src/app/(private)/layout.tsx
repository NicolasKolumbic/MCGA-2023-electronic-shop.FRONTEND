import Navbar from "@/components/shared/navbar";

export default function LoggedLayout({children}: {children: React.ReactNode}) {

    return <>
        <div>
            <header>
                <Navbar />
            </header>
            <main className='container ml-auto mr-auto'>
                {children}
            </main>
        </div>
    </>
};