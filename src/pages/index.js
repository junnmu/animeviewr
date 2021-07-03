import api from "../services/api"
import { useState } from "react"

export default function Index() {
    const [search, setSearch] = useState([])
    const [found, setFound] = useState([false])
    const [profile, setProfile] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
            const response = await api.get(search, { validateStatus: false })
            if (response.status == 200) {
                console.log(response.data)
                setProfile(response.data)
                setFound(true)
            }
            else {
                alert("Usuário não encontrado!")
            }  
        }
        catch {
            alert("Erro: Informe um usuário!")
        }
    }

    return (
        <>
            <div className="search-container">
                <form onSubmit={handleSubmit}>
                    <img src="/logo.png" alt="Animeviewr" />
                    <input 
                        placeholder="Informe o usuário do MyAnimeList" 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </div>

            { found == true && (
                <div className="profile-container">
                    <div className="card-profile">
                        <a target="_blank" href={profile.url}><p className="profile-name">{ profile.username }</p></a>
                        <img className="profile-img" src={profile.image_url} alt="Image" />
                        { profile.location != null && (
                            <p>Local: { profile.location }</p>
                        )}
                        <p>Animes completos: { profile.anime_stats.completed }</p>
                        <p>Mangás completos: { profile.manga_stats.completed }</p>
                    </div>
                    <div className="card-animes-mangas">
                        <p className="animes-mangas">Mangás favoritos</p>
                        <ul>
                            { profile.favorites.manga.slice(0,9).map(manga => (
                                <li key={manga.mal_id}>
                                    <a href={manga.url} target="_blank"><img src={manga.image_url} alt={manga.name} className="img-mangas-animes" /></a>
                                </li>
                            ))}
                        </ul>
                        <p className="animes-mangas">Animes favoritos</p>
                        <ul>
                            { profile.favorites.anime.slice(0,9).map(anime => (
                                <li key={anime.mal_id}>
                                    <a href={anime.url} target="_blank"><img src={anime.image_url} alt={anime.name} className="img-mangas-animes" /></a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}