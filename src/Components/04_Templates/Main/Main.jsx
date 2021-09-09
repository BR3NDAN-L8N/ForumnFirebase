// STYLE
import './Main.css'

export default function MainTemplate({mainContent}) {

    const MainContent = () => {
        return (mainContent)
    }

    return (
        <>
            <header>HEADER</header>
            <main>
                {
                    <MainContent />
                }
            </main>
            <footer>FOOTER</footer>
        </>
    )
}