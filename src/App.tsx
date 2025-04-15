// React
import { useState } from "react";

// Imagens
import github from "./assets/github.png";

// Interfaces
import { User } from "./interface/user"

// CSS
import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [input, setInput] = useState("");
  const [hasSearched, setBuscado] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBuscado(true); 

    try {
      const resposta = await fetch(apiUrl + encodeURIComponent(input));
      const data = await resposta.json();

      if (resposta.status !== 404) {
        const usuario: User = {
          login: data.login,
          name: data.name,
          avatar_url: data.avatar_url,
          bio: data.bio,
        };

        setUser(usuario);
      } else {
        setUser(null);
      }
    } catch (erro) {
      setUser(null);
      console.error("Erro ao chamar a API:", erro);
    }
  };

  return (
    <>
      <div className="bg-black flex flex-col px-36 py-12 items-center w-380 h-150">
        <div className="text-white text-7xl flex items-center">
          <img src={github} alt="GitHub Icon" className="w-15 mx-1" />
          <h1 className="mx-1">Perfil</h1>
          <h1 className="font-bold mx-1">GitHub</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 flex items-center">
          <input
            type="text"
            className="bg-white border-2 border-gray-700 text-black text-xl font-semibold rounded-lg w-150 h-16 relative left-8 placeholder-black px-6 outline-none placeholder:font-semibold placeholder:text-xl"
            placeholder="Digite um usuário do Github"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-blue-600 w-15 h-14 flex justify-center items-center relative right-8 rounded-md"
          >
            <i className="fa-solid fa-magnifying-glass w-24"></i>
          </button>
        </form>

        {hasSearched &&
          (user ? (
            <div className="mt-12 background-card flex p-4 rounded-4xl w-250">
              <img
                src={user.avatar_url}
                alt="Foto do usuário"
                className="w-40 h-40 rounded-full object-cover"
              />
              <div className="flex flex-col mx-12 justify-center">
                <h1 className="text-blue-600 font-semibold text-2xl">
                  {user.name || user.login}
                </h1>
                <p className="mt-6">{user.bio || "Sem bio disponível."}</p>
              </div>
            </div>
          ) : (
            <div className="mt-12 background-card flex flex-col p-4 rounded-xl justify-center items-center w-250">
              <h1 className="text-red-500 text-2xl">
                Nenhum perfil foi encontrado com esse nome de usuário.
              </h1>
              <h1 className="text-red-500 text-2xl">Tente Novamente!</h1>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
