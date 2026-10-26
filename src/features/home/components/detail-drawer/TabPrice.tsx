"use client";

import React from "react";
import { Venue } from "../../types/home.types";
import { HOME_TEXTS } from "../../constants/home.constants";

interface TabPriceProps {
  venue: Venue;
}

export function TabPrice({ venue }: TabPriceProps) {
  if (!venue.priceTable || venue.priceTable.length === 0) {
    return (
      <p className="py-4 text-center text-xs text-muted-foreground">
        {HOME_TEXTS.noPriceText}
      </p>
    );
  }

  return (
    <div className="text-xs">
      <h4 className="font-bold text-foreground mb-2">
        {HOME_TEXTS.priceTableTitle}
      </h4>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-muted font-bold text-foreground border-b border-border">
              <th className="p-2 border-r border-border">
                {HOME_TEXTS.thDays}
              </th>
              <th className="p-2 border-r border-border">
                {HOME_TEXTS.thTimeSlot}
              </th>
              <th className="p-2 border-r border-border">
                {HOME_TEXTS.thFixedPrice}
              </th>
              <th className="p-2">{HOME_TEXTS.thCasualPrice}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-muted-foreground">
            {venue.priceTable.map((row, idx) => (
              <tr key={idx} className="hover:bg-muted/50">
                <td className="p-2 font-medium border-r border-border text-foreground">
                  {row.days}
                </td>
                <td className="p-2 border-r border-border">{row.timeSlot}</td>
                <td className="p-2 border-r border-border">{row.fixedPrice}</td>
                <td className="p-2 font-semibold text-primary">
                  {row.casualPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
