import React, { useState } from "react";
import Calendar from "react-calendar";
import "./MealCalendar.css";
import DayComponent from "./DayComponent";
import { Day, sampleDay, Cart, RecipeIngredient } from "../types/mealTypes";
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

  const CustomCalendarHeader = ({ date, view, onClickPrev, onClickNext }) => {
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
    const monthLabel = months[date.getMonth()];
    const yearLabel = date.getFullYear();

    return (
      <div className="custom-calendar-header">
        <button onClick={() => onClickPrev()} title="Previous month">
          &lsaquo;
        </button>
        <span>{`${monthLabel} ${yearLabel}`}</span>
        <button onClick={() => onClickNext()} title="Next month">
          &rsaquo;
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
            navigation={({ date, view, onClickPrev, onClickNext }) => (
              <CustomCalendarHeader
                date={date}
                view={view}
                onClickPrev={onClickPrev}
                onClickNext={onClickNext}
              />
            )}
            formatShortWeekday={(locale, date) =>
              ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]
            }
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
