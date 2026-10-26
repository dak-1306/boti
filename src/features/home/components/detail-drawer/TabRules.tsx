"use client";

import React from "react";
import { Venue, VenueRuleSection } from "../../types/home.types";
import { HOME_TEXTS } from "../../constants/home.constants";

interface TabRulesProps {
  venue: Venue;
}

export function TabRules({ venue }: TabRulesProps) {
  if (!venue.rules || venue.rules.length === 0) {
    return (
      <p className="py-4 text-center text-xs text-muted-foreground">
        {HOME_TEXTS.noRulesText}
      </p>
    );
  }

  return (
    <div className="space-y-4 text-xs">
      <h4 className="font-bold text-foreground">{HOME_TEXTS.rulesTitle}</h4>

      {venue.rules.map((ruleItem, idx) => {
        const isSection = typeof ruleItem === "object" && ruleItem !== null;
        const title = isSection ? (ruleItem as VenueRuleSection).title : "";
        const items = isSection
          ? (ruleItem as VenueRuleSection).items
          : [String(ruleItem)];

        return (
          <div key={idx} className="space-y-1.5">
            {title && <h5 className="font-bold text-foreground">{title}</h5>}
            <ul className="space-y-1 text-muted-foreground">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-1.5">
                  <span className="text-primary font-bold">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
