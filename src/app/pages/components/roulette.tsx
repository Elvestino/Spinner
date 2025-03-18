"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function Roulette() {
  const initialMatcheshuit = Array(16).fill("");
  const initialMatchesquatre = Array(8).fill("");
  const initialMatchesdemi = Array(4).fill("");
  const initialMatchesfinal = Array(2).fill("");

  const [huitiemes, setHuitiemes] = useState(initialMatcheshuit);
  const [quatre, setQuatre] = useState(initialMatchesquatre);
  const [demi, setDemi] = useState(initialMatchesdemi);
  const [final, setFinal] = useState(initialMatchesfinal);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [newOption, setNewOption] = useState("");
  const [spinning, setSpinning] = useState(false);

  const removeAndAdvance = (
    player: string,
    from: string[],
    setFrom: any,
    to: string[],
    setTo: any
  ) => {
    setFrom((prev: any) => prev.map((p: any) => (p === player ? "" : p)));
    setTo((prev: any) => {
      const updated = [...prev];
      const emptyIndex = updated.findIndex((p) => p === "");
      if (emptyIndex !== -1) {
        updated[emptyIndex] = player;
      }
      return updated;
    });
  };

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

  const spinWheel = () => {
    if (options.length === 0 || spinning) return;
    setSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      const chosen = options[randomIndex];
      setSelected(chosen);
      setOptions(options.filter((_, index) => index !== randomIndex));
      setSpinning(false);

      setHuitiemes((prev) => {
        const updated = [...prev];
        const emptyIndex = updated.findIndex((match) => match === "");
        if (emptyIndex !== -1) {
          updated[emptyIndex] = chosen;
        }
        return updated;
      });

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
      <div className="flex flex-col items-center p-5">
        <h1 className="text-5xl font-bold mb-10 text-orange-500">
          Roulette G.I.F.A
        </h1>
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          className="border p-2 rounded mb-2"
          placeholder="Entrer un participant"
        />
        <button
          onClick={addOption}
          className="bg-blue-500 text-white px-4 py-2 text-2xl font-bold rounded m-6 w-50 cursor-pointer"
        >
          Ajouter
        </button>
        <motion.div
          animate={{ rotate: spinning ? 360 * 5 : 0 }}
          transition={{ duration: 2 }}
          className="w-[450px] h-[450px] bg-gray-300 flex items-center justify-center rounded-full border-4 border-gray-500 relative"
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
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer text-2xl font-bold mt-6 w-50"
        >
          Tourner
        </button>
        <div>
          <h2 className="text-xl font-bold mt-6  text-orange-500">
            Participants
          </h2>
          <ul className=" list-none">
            {options.map((item, index) => (
              <li key={index} className="text-lg  ">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 p-6">
        {[
          {
            title: "1/8 de Finale",
            data: huitiemes,
            set: setHuitiemes,
            next: quatre,
            setNext: setQuatre,
          },
          {
            title: "1/4 de Finale",
            data: quatre,
            set: setQuatre,
            next: demi,
            setNext: setDemi,
          },
          {
            title: "1/2 Finale",
            data: demi,
            set: setDemi,
            next: final,
            setNext: setFinal,
          },
          {
            title: "Finale",
            data: final,
            set: setFinal,
            next: null,
            setNext: null,
          },
        ].map((round, roundIndex) => (
          <div key={roundIndex} className="flex flex-col items-center gap-y-4">
            <h2 className="text-3xl font-bold mb-4 text-orange-500">
              {round.title}
            </h2>
            {round.data.map((match, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-white shadow-md w-40 text-center relative"
              >
                <p className="font-semibold text-black">
                  {match || "En attente..."}
                </p>
                {match && round.next && (
                  <button
                    onClick={() =>
                      removeAndAdvance(
                        match,
                        round.data,
                        round.set,
                        round.next,
                        round.setNext
                      )
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
