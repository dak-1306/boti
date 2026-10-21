"use client";

import React from "react";
import { User, Phone, Users, FileText, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingCustomerInfo } from "../../types/bookings.types";

interface BookingCustomerCardProps {
  customer?: BookingCustomerInfo;
  onEdit?: () => void;
}

export function BookingCustomerCard({
  customer,
  onEdit,
}: BookingCustomerCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-slate-800/80">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100">
          Thông tin đặt sân
        </h3>

        {onEdit && (
          <Button
            size="sm"
            variant="outline"
            onClick={onEdit}
            className="h-6 rounded-full border-blue-200 bg-blue-50/50 px-2.5 text-[10px] font-bold text-blue-600 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400"
          >
            <Edit3 className="mr-1 h-3 w-3" />
            Chỉnh sửa
          </Button>
        )}
      </div>

      <div className="mt-3 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-400">
            <User className="h-3.5 w-3.5" /> Người đặt:
          </span>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {customer?.name || "Nguyễn Văn A"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-400">
            <Phone className="h-3.5 w-3.5" /> Số điện thoại:
          </span>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {customer?.phone || "0901 234 567"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-400">
            <Users className="h-3.5 w-3.5" /> Số người chơi:
          </span>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {customer?.playerCount ?? 4} người
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-400">
            <FileText className="h-3.5 w-3.5" /> Ghi chú:
          </span>
          <span className="font-medium text-slate-600 dark:text-slate-300">
            {customer?.notes || "Không có"}
          </span>
        </div>
      </div>
    </div>
  );
}