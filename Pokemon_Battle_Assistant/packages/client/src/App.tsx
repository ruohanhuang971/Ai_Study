import { Outlet } from 'react-router';
import './App.css';

function App() {
    return (
        <>
            <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
                <Outlet /> {/* Outlet render all children of App*/}
            </main>
        </>
    );
}

export default App;
