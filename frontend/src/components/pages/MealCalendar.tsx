import React, { useState } from "react";
import Calendar from "react-calendar";
import "./MealCalendar.css";
import DayComponent from "./DayComponent";
import { Day, sampleDay, Cart } from "../types/mealTypes";
import { Value } from "react-calendar/dist/cjs/shared/types";

interface MealCalendarProps {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  onAddToCart: (ingredient: RecipeIngredient) => void;
}

const MealCalendar: React.FC<MealCalendarProps> = ({
  cart,
  setCart,
  onAddToCart,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      console.log(value);
    }
  };

  const CustomCalendarHeader = ({
    label,
    onChange,
  }: {
    label: string;
    onChange: (value: Value) => void;
  }) => {
    const handleMonthChange = (direction: number) => {
      const newDate = new Date(label);
      newDate.setMonth(newDate.getMonth() + direction);
      onChange(newDate);
    };

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthLabel = months[new Date(label).getMonth()];
    const yearLabel = new Date(label).getFullYear();

    return (
      <div className="custom-calendar-header">
        <button
          className="react-calendar__navigation__prev2-button"
          onClick={() => handleMonthChange(-12)}
        >
          &laquo;
        </button>
        <button
          className="react-calendar__navigation__prev-button"
          onClick={() => handleMonthChange(-1)}
        >
          &lsaquo;
        </button>
        <span className="react-calendar__navigation__label">{`${monthLabel} ${yearLabel}`}</span>
        <button
          className="react-calendar__navigation__next-button"
          onClick={() => handleMonthChange(1)}
        >
          &rsaquo;
        </button>
        <button
          className="react-calendar__navigation__next2-button"
          onClick={() => handleMonthChange(12)}
        >
          &raquo;
        </button>
      </div>
    );
  };

  return (
    <div className="react-calendar">
      <div className="calendar-body">
        <h2 className="text-2xl font-bold mb-4 text-sky-800">meal calendar</h2>
        {selectedDate ? (
          <DayView
            day={sampleDay}
            onClose={() => setSelectedDate(null)}
            cart={cart}
            setCart={setCart}
            date={selectedDate}
            onAddToCart={onAddToCart}
          />
        ) : (
          <Calendar
            onChange={handleDateClick}
            value={selectedDate}
            className="w-full h-3/4"
            view="month"
            formatMonthYear={(locale, date) => (
              <CustomCalendarHeader
                label={date.toLocaleString(locale, {
                  month: "long",
                  year: "numeric",
                })}
                onChange={handleDateClick}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

interface DayViewProps {
  day: Day;
  onClose: () => void;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  date: Date;
  onAddToCart: (ingredient: RecipeIngredient) => void;
}

const DayView: React.FC<DayViewProps> = ({
  day,
  onClose,
  cart,
  setCart,
  date,
  onAddToCart,
}) => (
  <div className="DayViewWrapper">
    <button className="CloseButton" onClick={onClose}>
      X
    </button>
    <div className="DayViewContainer">
      <DayComponent
        day={day}
        cart={cart}
        setCart={setCart}
        date={date}
        onClose={onClose}
        onAddToCart={onAddToCart}
      />
    </div>
  </div>
);

export default MealCalendar;
