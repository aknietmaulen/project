import React from "react";

export default function ProjectInfo() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Project Information</h3>

        <div className="mb-4">
          <h4 className="text-xl font-semibold text-blue-700">Goal</h4>
          <p className="text-gray-700">
            The goal of this project is to analyze the effects of increasing the share of renewable energy sources (RES)
            in the power system, by simulating and comparing 11 scenarios with RES shares ranging from 10% to 60%
            in 5% increments.
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-xl font-semibold text-blue-700">Relevance</h4>
          <p className="text-gray-700">
            Understanding the cost sensitivity of renewable integration is key for energy policy, revealing when higher RES shares may raise costs or affect stability—guiding decisions for policymakers and planners.
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-xl font-semibold text-blue-700">General Assumptions</h4>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li>RES share is varied from 10% to 60% in 5% increments (11 scenarios in total).</li>
            <li>Each scenario is optimized using PyPSA’s Linearised AC Optimal Power Flow (LAC-OPF).</li>
            <li>Total system cost includes both investment and operational components.</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-blue-700">Team</h4>
          <p className="text-gray-700">
            This project is developed by a research team under the Power Market Modeling Initiative,
            as part of ongoing efforts to support evidence-based planning for Kazakhstan’s energy transition.
          </p>
        </div>
      </div>
    </div>
  );
}
