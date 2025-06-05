import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function DeliveryDateStep({ nextStep, prevStep, darkMode, formData }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [collectionDate, setCollectionDate] = useState("");
  const [showCollectionCalendar, setShowCollectionCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const today = new Date();

  // أيام الأسبوع
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // توليد أيام الشهر الحالي
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

  // تحميل التواريخ المحفوظة عند التحميل الأولي
  useEffect(() => {
    const savedDeliveryDate = localStorage.getItem("deliveryDate");
    const savedCollectionDate = localStorage.getItem("collectionDate");

    if (savedDeliveryDate) {
      setSelectedDate(savedDeliveryDate);
    }

    if (savedCollectionDate) {
      setCollectionDate(savedCollectionDate);
    } else {
      // تعيين تاريخ افتراضي للجمع (بعد 7 أيام من اليوم)
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

  // التحقق مما إذا كان اليوم عطلة (السبت أو الأحد)
  const isWeekend = (dayIndex) => {
    return dayIndex === 0 || dayIndex === 6; // 0 = الأحد، 6 = السبت
  };

  // التحقق مما إذا كان التاريخ سابقًا لليوم الحالي
  const isPastDate = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    return (
      selectedDate <
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  // تغيير الشهر
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
      localStorage.setItem("deliveryDate", formattedDate); // حفظ تاريخ التسليم
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
      localStorage.setItem("collectionDate", formattedDate); // حفظ تاريخ الجمع
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
    <div className="space-y-6">
      <div>
        <h1
          className={`text-2xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Choose Your Delivery Date
        </h1>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Select your preferred skip delivery date. We'll aim to deliver between
          7am and 6pm on your chosen day.
        </p>
      </div>

      <div className="space-y-4">
        {/* Delivery Date Calendar */}
        <div
          className={`p-4 rounded-xl border ${
            darkMode
              ? "bg-gray-800/50 border-gray-600"
              : "bg-white border-gray-200"
          }`}
        >
          <h3
            className={`font-medium mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Delivery Date
          </h3>

          <div className="mb-4">
            <div
              className={`flex justify-between items-center mb-3 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <button
                onClick={() => changeMonth(-1)}
                className={`p-1 rounded-md ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                &lt;
              </button>
              <span className="font-medium">
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
                className={`p-1 rounded-md ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                &gt;
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className={`text-center text-sm font-medium ${
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
                    new Date(currentYear, currentMonth, day).toDateString() ===
                      new Date(selectedDate).toDateString();

                  return (
                    <button
                      key={`${weekIndex}-${dayIndex}`}
                      onClick={() => handleDateSelect(day, dayIndex)}
                      disabled={disabled}
                      className={`aspect-square rounded-md flex items-center justify-center text-sm ${
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

        {/* Collection Date Section */}
        <div
          className={`p-4 rounded-xl border ${
            darkMode
              ? "bg-gray-800/50 border-gray-600"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3
              className={`font-medium ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Collection Date
            </h3>
            <button
              onClick={toggleCollectionCalendar}
              className={`flex items-center text-sm ${
                darkMode
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-500"
              }`}
            >
              {showCollectionCalendar ? "Hide" : "Change"}
              {showCollectionCalendar ? (
                <ChevronUp className="w-4 h-4 ml-1" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1" />
              )}
            </button>
          </div>
          <p
            className={`font-medium ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {collectionDate}
          </p>
          <p
            className={`text-sm mt-2 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We'll collect your skip on this date. Please ensure it's accessible.
          </p>

          {showCollectionCalendar && (
            <div className="mt-4">
              <div
                className={`flex justify-between items-center mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <button
                  onClick={() => changeMonth(-1)}
                  className={`p-1 rounded-md ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  &lt;
                </button>
                <span className="font-medium">
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
                  className={`p-1 rounded-md ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  &gt;
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className={`text-center text-sm font-medium ${
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
                        className={`aspect-square rounded-md flex items-center justify-center text-sm ${
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

      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
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
          className={`px-6 py-3 rounded-xl font-medium text-white transition-colors ${
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
  );
}
