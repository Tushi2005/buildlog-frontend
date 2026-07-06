export default function NavBar({ onNavigate }: { onNavigate: (page: string) => void }) {
    return <>
        <button onClick={() => onNavigate("Home")}>Home</button>
        <button onClick={() => onNavigate("Projects")}>Projects</button>
        <button onClick={() => onNavigate("Store")}>Store</button>
        <button onClick={() => onNavigate("Profile")}>Profile</button>
    </>
}