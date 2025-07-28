import React from "react";

export default function ProjectInfo() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">📘 Project Information</h2>

        <div>
          <h3 className="text-xl font-semibold text-blue-700">Goal</h3>
          <p className="text-gray-700">
            The goal of this project is to analyze the cost structure and generation mix of the electricity market
            using real-world data and interactive visualizations to support policy design and scenario exploration.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-blue-700">Relevance</h3>
          <p className="text-gray-700">
            With growing demand for clean energy and sustainability, understanding the impact of tariffs, renewable integration,
            and infrastructure planning is essential for building resilient and efficient power systems.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-blue-700">General Assumptions</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Data from 2018 and 2020 is used for modeling and validation.</li>
            <li>Tariffs are based on current and projected market scenarios.</li>
            <li>Generation mix includes conventional and renewable sources.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-blue-700">👥 Team</h3>
          <p className="text-gray-700">
            This project is developed by a research team under the Power Market Modeling Initiative.
          </p>
        </div>
      </div>
    </div>
  );
}
