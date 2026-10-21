"use client";

import React from "react";
import { Venue } from "../../types/home.types";

interface TabRulesProps {
  venue: Venue;
}

export function TabRules({ venue }: TabRulesProps) {
  if (!venue.rules || venue.rules.length === 0) {
    return (
      <p className="py-4 text-center text-xs text-slate-400">
        Chưa có điều khoản & quy định cụ thể.
      </p>
    );
  }

  return (
    <div className="space-y-4 text-xs">
      <h4 className="font-bold text-slate-800 dark:text-slate-100">
        Điều khoản & dịch vụ
      </h4>

      {venue.rules.map((section, idx) => (
        <div key={idx} className="space-y-1.5">
          <h5 className="font-bold text-slate-700 dark:text-slate-200">
            {section.title}
          </h5>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300">
            {section.items.map((item, itemIdx) => (
              <li key={itemIdx} className="flex items-start gap-1.5">
                <span className="text-blue-600 font-bold">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
