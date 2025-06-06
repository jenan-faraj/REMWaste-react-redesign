import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function DeliveryDateStep({ nextStep, prevStep, darkMode, formData }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [collectionDate, setCollectionDate] = useState("");
  const [showCollectionCalendar, setShowCollectionCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const today = new Date();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const calendarDays = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > daysInMonth) {
          week.push(null);
        } else {
          week.push(day++);
        }
      }
      calendarDays.push(week);
      if (day > daysInMonth) break;
    }

    return calendarDays;
  };

  const calendarDays = generateCalendarDays();

  useEffect(() => {
    const savedDeliveryDate = localStorage.getItem("deliveryDate");
    const savedCollectionDate = localStorage.getItem("collectionDate");

    if (savedDeliveryDate) {
      setSelectedDate(savedDeliveryDate);
    }

    if (savedCollectionDate) {
      setCollectionDate(savedCollectionDate);
    } else {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 7);
      const formattedDate = defaultDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setCollectionDate(formattedDate);
      localStorage.setItem("collectionDate", formattedDate);
    }
  }, []);

  const isWeekend = (dayIndex) => {
    return dayIndex === 0 || dayIndex === 6;
  };

  const isPastDate = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    return (
      selectedDate <
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  const changeMonth = (increment) => {
    setCurrentMonth((prev) => {
      let newMonth = prev + increment;
      let newYear = currentYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }

      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const handleDateSelect = (day, dayIndex) => {
    if (day && !isWeekend(dayIndex) && !isPastDate(day)) {
      const date = new Date(currentYear, currentMonth, day);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setSelectedDate(formattedDate);
      localStorage.setItem("deliveryDate", formattedDate);
    }
  };

  const handleCollectionDateSelect = (day, dayIndex) => {
    if (day && !isWeekend(dayIndex) && !isPastDate(day)) {
      const date = new Date(currentYear, currentMonth, day);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setCollectionDate(formattedDate);
      localStorage.setItem("collectionDate", formattedDate);
    }
  };

  const toggleCollectionCalendar = () => {
    setShowCollectionCalendar(!showCollectionCalendar);
  };

  const handleContinue = () => {
    if (selectedDate) {
      nextStep({
        deliveryDate: selectedDate,
        collectionDate: collectionDate,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div
        className={`w-full max-w-lg ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">
              Choose Your Delivery Date
            </h1>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Select your preferred skip delivery date. We'll aim to deliver
              between 7am and 6pm on your chosen day.
            </p>
          </div>

          <div className="space-y-4">
            <div
              className={`p-3 rounded-lg border ${
                darkMode
                  ? "bg-gray-800/50 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3 className={`font-medium mb-3 text-sm`}>Delivery Date</h3>

              <div className="mb-3">
                <div
                  className={`flex justify-between items-center mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <button
                    onClick={() => changeMonth(-1)}
                    className={`p-1 rounded-md text-sm ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    &lt;
                  </button>
                  <span className="font-medium text-sm">
                    {new Date(currentYear, currentMonth).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </span>
                  <button
                    onClick={() => changeMonth(1)}
                    className={`p-1 rounded-md text-sm ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    &gt;
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-1">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day}
                      className={`text-center text-xs font-medium ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((week, weekIndex) =>
                    week.map((day, dayIndex) => {
                      const disabled =
                        !day || isWeekend(dayIndex) || isPastDate(day);
                      const isSelected =
                        selectedDate &&
                        new Date(
                          currentYear,
                          currentMonth,
                          day
                        ).toDateString() ===
                          new Date(selectedDate).toDateString();

                      return (
                        <button
                          key={`${weekIndex}-${dayIndex}`}
                          onClick={() => handleDateSelect(day, dayIndex)}
                          disabled={disabled}
                          className={`aspect-square rounded-md flex items-center justify-center text-xs ${
                            !day
                              ? "opacity-0 cursor-default"
                              : disabled
                              ? darkMode
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-gray-400 cursor-not-allowed"
                              : isSelected
                              ? darkMode
                                ? "bg-blue-600 text-white"
                                : "bg-blue-500 text-white"
                              : darkMode
                              ? "hover:bg-gray-700 text-white"
                              : "hover:bg-gray-100 text-gray-800"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div
              className={`p-3 rounded-lg border ${
                darkMode
                  ? "bg-gray-800/50 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3
                  className={`font-medium text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Collection Date
                </h3>
                <button
                  onClick={toggleCollectionCalendar}
                  className={`flex items-center text-xs ${
                    darkMode
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-500"
                  }`}
                >
                  {showCollectionCalendar ? "Hide" : "Change"}
                  {showCollectionCalendar ? (
                    <ChevronUp className="w-3 h-3 ml-1" />
                  ) : (
                    <ChevronDown className="w-3 h-3 ml-1" />
                  )}
                </button>
              </div>
              <p className={`font-medium text-sm`}>{collectionDate}</p>
              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                We'll collect your skip on this date. Please ensure it's
                accessible.
              </p>

              {showCollectionCalendar && (
                <div className="mt-3">
                  <div
                    className={`flex justify-between items-center mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <button
                      onClick={() => changeMonth(-1)}
                      className={`p-1 rounded-md text-sm ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      &lt;
                    </button>
                    <span className="font-medium text-sm">
                      {new Date(currentYear, currentMonth).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                    <button
                      onClick={() => changeMonth(1)}
                      className={`p-1 rounded-md text-sm ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      &gt;
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {daysOfWeek.map((day) => (
                      <div
                        key={day}
                        className={`text-center text-xs font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((week, weekIndex) =>
                      week.map((day, dayIndex) => {
                        const disabled =
                          !day || isWeekend(dayIndex) || isPastDate(day);
                        const isSelected =
                          collectionDate &&
                          new Date(
                            currentYear,
                            currentMonth,
                            day
                          ).toDateString() ===
                            new Date(collectionDate).toDateString();

                        return (
                          <button
                            key={`collection-${weekIndex}-${dayIndex}`}
                            onClick={() =>
                              handleCollectionDateSelect(day, dayIndex)
                            }
                            disabled={disabled}
                            className={`aspect-square rounded-md flex items-center justify-center text-xs ${
                              !day
                                ? "opacity-0 cursor-default"
                                : disabled
                                ? darkMode
                                  ? "text-gray-500 cursor-not-allowed"
                                  : "text-gray-400 cursor-not-allowed"
                                : isSelected
                                ? darkMode
                                  ? "bg-blue-600 text-white"
                                  : "bg-blue-500 text-white"
                                : darkMode
                                ? "hover:bg-gray-700 text-white"
                                : "hover:bg-gray-100 text-gray-800"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-3">
            <button
              onClick={prevStep}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedDate}
              className={`px-4 py-2 rounded-lg font-medium text-sm text-white transition-colors ${
                selectedDate
                  ? darkMode
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Continue to Payment →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
