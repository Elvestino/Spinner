import React from "react";

const matches = {
  huitiemes: [
    "1er A vs 2ème B",
    "1er C vs 2ème D",
    "1er E vs 2ème F",
    "1er G vs 2ème H",
    "1er B vs 2ème A",
    "1er D vs 2ème C",
    "1er F vs 2ème E",
    "1er H vs 2ème G",
  ],
  quarts: ["I vs II", "III vs IV", "V vs VI", "VII vs VIII"],
  demiFinales: ["a vs b", "c vs d"],
  finale: "Finale",
};

const TournamentBracket = () => {
  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen py-10">
      <h1 className="text-3xl font-bold mb-8 text-orange-500">
        TOURNOI MASCULIN
      </h1>

      <div className="grid grid-cols-4 gap-6 w-full max-w-6xl">
        {/* 1/8 de Finale */}
        <div className="flex flex-col space-y-4">
          {matches.huitiemes.map((match, index) => (
            <div
              key={index}
              className="border-l-4 border-orange-500 pl-4 py-2 bg-gray-800 rounded-md text-center"
            >
              {match}
            </div>
          ))}
        </div>

        {/* 1/4 de Finale */}
        <div className="flex flex-col space-y-10">
          {matches.quarts.map((match, index) => (
            <div
              key={index}
              className="border-l-4 border-white pl-4 py-4 bg-gray-700 rounded-md text-center"
            >
              {match}
            </div>
          ))}
        </div>

        {/* 1/2 Finale */}
        <div className="flex flex-col space-y-16">
          {matches.demiFinales.map((match, index) => (
            <div
              key={index}
              className="border-l-4 border-yellow-500 pl-4 py-6 bg-gray-600 rounded-md text-center"
            >
              {match}
            </div>
          ))}
        </div>

        {/* Finale */}
        <div className="flex flex-col items-center justify-center">
          <div className="border-l-4 border-red-500 pl-4 py-8 bg-gray-500 rounded-md text-center text-xl font-bold">
            {matches.finale}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket;
