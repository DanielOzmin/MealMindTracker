import { useState } from "react"

const Home = () => {
    const [input, setInput] = useState<string>();
    const [ingredients, setIngedients] = useState<any>();

    const handleSearch = async(e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        console.log(input)
        try {
            const response = await fetch("/api/Nutrient/test")
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <>
        <form onSubmit={handleSearch}>
            <label>Search ingredients</label>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit">Search</button>
        </form>

    </>)
}

export default Home