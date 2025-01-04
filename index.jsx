import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, useSearchParams } from "react-router-dom";

const swCharacters = [
    { name: "Luke Skywalker", type: "Jedi" },
    { name: "Darth Vader", type: "Sith" },
    { name: "Emperor Palpatine", type: "Sith" },
    { name: "Yoda", type: "Jedi" }
]

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")

    /**
     * Challenge: think how we might approach filtering the list of
     * characters down based on the typeFilter we grabbed from the 
     * searchParams.
     * 
     * Extra credit: try doing it yourself!
     */
    const displayedCharacters = typeFilter
        ? swCharacters.filter(char => char.type.toLowerCase() === typeFilter)
        : swCharacters

    const charEls = displayedCharacters
        .map(char => (
            <div key={char.name}>
                <h3
                    style={{ color: char.type.toLowerCase() === "jedi" ? "blue" : "red" }}
                >
                    Name: {char.name}
                </h3>
                <p>Type: {char.type}</p>
                <hr />
            </div>
        ))

    return (
        <main>
            <h2>Home</h2>
            {charEls}
        </main>
    );
}


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/characters" element={<HomePage />} />
                <Route path="/" element={<Link to="/characters">Go to characters</Link>} />
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)