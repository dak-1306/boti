"use client";

import React from "react";
import { Venue } from "../../types/home.types";

interface TabPriceProps {
  venue: Venue;
}

export function TabPrice({ venue }: TabPriceProps) {
  if (!venue.priceTable || venue.priceTable.length === 0) {
    return (
      <p className="py-4 text-center text-xs text-slate-400">
        Chưa có thông tin bảng giá.
      </p>
    );
  }

  return (
    <div className="text-xs">
      <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
        Bảng giá sân
      </h4>

      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-slate-50 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
              <th className="p-2 border-r border-slate-200 dark:border-slate-800">
                Thẻ
              </th>
              <th className="p-2 border-r border-slate-200 dark:border-slate-800">
                Khung giờ
              </th>
              <th className="p-2 border-r border-slate-200 dark:border-slate-800">
                Cố định
              </th>
              <th className="p-2">Vãng lai</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
            {venue.priceTable.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
              >
                <td className="p-2 font-medium border-r border-slate-200 dark:border-slate-800">
                  {row.days}
                </td>
                <td className="p-2 border-r border-slate-200 dark:border-slate-800">
                  {row.timeSlot}
                </td>
                <td className="p-2 border-r border-slate-200 dark:border-slate-800">
                  {row.fixedPrice}
                </td>
                <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">
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
