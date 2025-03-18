"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2"; // Import de SweetAlert2

export default function Roulette() {
  const initialMatcheshuit = Array(16).fill("");
  const initialMatchesquatre = Array(8).fill("");
  const initialMatchesdemi = Array(4).fill("");
  const initialMatchesfinal = Array(2).fill("");
  const [huitiemes, setHuitiemes] = useState(initialMatcheshuit);
  const [quatre, setquatre] = useState(initialMatchesquatre);
  const [demi, setdemi] = useState(initialMatchesdemi);
  const [final, setfinal] = useState(initialMatchesfinal);

  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [newOption, setNewOption] = useState("");
  const [spinning, setSpinning] = useState(false);
  // Fonction pour ajouter une option
  const addOption = () => {
    if (newOption.trim() !== "") {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  // Fonction pour générer une couleur aléatoire pour l'option
  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#5733FF", "#F0E130", "#FF8C00"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Fonction pour faire tourner la roulette
  const spinWheel = () => {
    if (options.length === 0 || spinning) return;
    setSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      const chosen = options[randomIndex];
      setSelected(chosen);
      setOptions(options.filter((_, index) => index !== randomIndex));
      setSpinning(false);

      // Ajout du gagnant dans la première case vide des 1/8 de finale
      setHuitiemes((prevHuitiemes) => {
        const updatedMatches = [...prevHuitiemes];
        const emptyIndex = updatedMatches.findIndex((match) => match === "");
        if (emptyIndex !== -1) {
          updatedMatches[emptyIndex] = chosen;
        }
        return updatedMatches;
      });

      // Affichage du résultat avec SweetAlert2
      Swal.fire({
        title: "Resultat",
        text: ` ${chosen}`,
        icon: "success",
        confirmButtonText: "OK",
        background: "#f0f0f0",
        color: "#333",
        confirmButtonColor: "#4CAF50",
      });
    }, 2000);
  };

  return (
    <main className="bg-gray-900 text-white">
      <div className=" grid grid-cols-[75%_25%] items-center ">
        <div className="flex flex-col  items-center p-5">
          <h1 className="text-5xl font-bold mb-10 text-orange-500">
            Roulette G.I.F.A
          </h1>
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            className="border p-2 rounded mb-2 w-70"
            placeholder="Entrer un participant"
          />
          <button
            onClick={addOption}
            className="bg-blue-500 text-white px-4 py-2 rounded m-6 w-40 "
          >
            Ajouter
          </button>

          <motion.div
            animate={{ rotate: spinning ? 360 * 5 : 0 }}
            transition={{ duration: 2 }}
            className="w-[400px] h-[400px] bg-gray-300 flex items-center justify-center rounded-full border-4 border-gray-500 relative"
          >
            {/* Affichage des options disposées en cercle autour de la roulette */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div
                className="flex justify-center items-center"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformOrigin: "center",
                  borderRadius: "50%",
                }}
              >
                {options.map((option, index) => {
                  const angle = (index / options.length) * 360; // Calcul de l'angle de chaque option
                  return (
                    <div
                      key={index}
                      style={{
                        position: "absolute",
                        transform: `rotate(${angle}deg) translateY(-160px)`, // Ajusté pour l'agrandissement
                        transformOrigin: "50% 50%",
                        padding: "8px 0px",
                        borderRadius: "3px",
                        backgroundColor: getRandomColor(), // Fond coloré pour chaque option
                        textAlign: "center",
                        fontSize: "20px",
                        display: "flex",
                        justifyContent: "center", // Centre le texte horizontalement
                        alignItems: "center", // Centre le texte verticalement
                        color: "#fff",
                        minWidth: "60px",
                        writingMode: "vertical-rl", // Définit l'écriture verticale de chaque texte
                      }}
                      className="text-xs sm:text-sm"
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Afficher le résultat du tirage au centre de la roulette */}
            {selected ? (
              <p className="text-4xl font-bold text-red-400 uppercase">
                {selected}
              </p>
            ) : (
              <p className="font-bold text-red-400">le nom sera afficher ici</p>
            )}
          </motion.div>

          <button
            onClick={spinWheel}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Tourner
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold mt-6 list-none text-orange-500">
            Participants
          </h2>
          <ul className="list-disc ">
            {options.map((item, index) => (
              <li key={index} className="text-lg ">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center  text-white min-h-screen pt-32">
        <h1 className="text-5xl font-bold mb-8 text-orange-500">
          TOURNOI Free Fire
        </h1>

        <div className="grid grid-cols-4 gap-6 w-full max-w-6xl">
          <div className="flex flex-col space-y-4">
            <h2 className="text-center text-3xl font-bold mt-6 ">
              1/8 de Finale
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {huitiemes.map((match, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-white shadow-md w-40 text-center"
                >
                  <p className="font-semibold text-black">
                    {match || "En attente..."}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-10">
            <h2 className="text-center text-3xl font-bold ">1/4 de Finale</h2>
            {quatre.map((match, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-white shadow-md w-40 text-center"
              >
                <p className="font-semibold text-black">
                  {match || "En attente..."}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-16">
            <h2 className="text-center text-3xl font-bold ">1/2 Finale </h2>
            {demi.map((match, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-white shadow-md w-40 text-center"
              >
                {match}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-center text-3xl font-bold mb-3">Finale</h2>

            {final.map((match, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-white shadow-md w-40 text-center"
              >
                {match}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
