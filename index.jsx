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

    function genNewSearchParamString(key, value) {
        const sp = new URLSearchParams(searchParams)
        if (value === null) {
            sp.delete(key)
        } else {
            sp.set(key, value)
        }
        return `?${sp.toString()}`
    }

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    return (
        <main>
            <h2>Home</h2>
            <div>
                <Link to={genNewSearchParamString("type", "jedi")}>Jedi</Link>
                <Link to={genNewSearchParamString("type", "sith")}>Sith</Link>
                <Link to={genNewSearchParamString("type", null)}>Clear</Link>
            </div>
            <div>
                <button onClick={() => handleFilterChange("type", "jedi")}>Jedi</button>
                <button onClick={() => handleFilterChange("type", "sith")}>Sith</button>
                <button onClick={() => handleFilterChange("type", null)}>Clear</button>
            </div>
            <hr />
            {charEls}
        </main>
    );
}

// <Link to="?type=jedi">Jedi</Link>
// <Link to="?type=sith">Sith</Link>
// <Link to=".">Clear</Link>


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