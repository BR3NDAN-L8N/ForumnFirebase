// REACT
import React, { ReactComponentElement, ReactElement } from 'react'

// STYLE
import './Main.css'

interface Props {
    mainContent: any
}

export default function Main({ mainContent: MainContent }: Props): ReactElement {
    return (
        <>
            <header>HEADER</header>
            <main>
                <MainContent />
            </main>
            <footer>FOOTER</footer>
        </>
    )
}
