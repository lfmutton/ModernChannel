import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Save } from "lucide-react";
import { motion } from "framer-motion";
import PasswordVerification from "../components/ui/PasswordVerification";

// Mock data for carousel banners
const carouselItems = [
  {
    id: 1,
    title: "PEPPA PIG",
    image:
      "https://br.web.img3.acsta.net/pictures/18/05/03/19/09/2970720.jpg",
  },
  {
    id: 2,
    title: "SUPER ONZE",
    image:
      "https://www.jbchost.com.br/editorajbc/wp-content/uploads/2013/09/capa_super_onze_01_g.jpg",
  },
  {
    id: 3,
    title: "POKÉMON",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_NC5WohO-V14XcVoQaDvc81Otnj9ulGWHJA&s",
  },
  {
    id: 4,
    title: "SYNTHWAVE",
    image:
      "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 5,
    title: "DIGITAL DREAMS",
    image:
      "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 6,
    title: "PIXEL PERFECT",
    image:
      "https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 7,
    title: "VECTOR VOYAGE",
    image:
      "https://images.pexels.com/photos/2510067/pexels-photo-2510067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 8,
    title: "BIT CRUSHED",
    image:
      "https://images.pexels.com/photos/3056059/pexels-photo-3056059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 9,
    title: "GLITCH ART",
    image:
      "https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 10,
    title: "8-BIT WONDERS",
    image:
      "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

// Schedule data structure
interface ScheduleItem {
  day: string;
  time: string;
  show: string;
  showId: number;
}

const Schedule: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem("tvSchedule");
    return saved
      ? JSON.parse(saved)
      : [
          { day: "MON", time: "20:00", show: "NEON NIGHTS", showId: 3 },
          { day: "WED", time: "16:00", show: "CYBER NEXUS", showId: 1 },
        ];
  });

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedShow, setSelectedShow] = useState<{
    title: string;
    id: number;
  } | null>(null);

  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const timeSlots = [
    "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ];

  useEffect(() => {
    localStorage.setItem("tvSchedule", JSON.stringify(schedule));
  }, [schedule]);

  if (!isVerified) {
    return <PasswordVerification onVerified={() => setIsVerified(true)} />;
  }

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % (carouselItems.length - 2));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? carouselItems.length - 3 : prev - 1
    );
  };

  const handleCellClick = (day: string, time: string) => {
    setSelectedDay(day);
    setSelectedTime(time);

    const existing = schedule.find(
      (item) => item.day === day && item.time === time
    );
    if (existing) {
      setSelectedShow({ title: existing.show, id: existing.showId });
    } else {
      setSelectedShow(null);
    }
  };

  const addToSchedule = () => {
    if (selectedDay && selectedTime && selectedShow) {
      const updated = schedule.filter(
        (item) => !(item.day === selectedDay && item.time === selectedTime)
      );

      setSchedule([
        ...updated,
        {
          day: selectedDay,
          time: selectedTime,
          show: selectedShow.title,
          showId: selectedShow.id,
        },
      ]);

      setSelectedDay(null);
      setSelectedTime(null);
      setSelectedShow(null);
    }
  };

  const removeFromSchedule = () => {
    if (selectedDay && selectedTime) {
      setSchedule(
        schedule.filter(
          (item) => !(item.day === selectedDay && item.time === selectedTime)
        )
      );
      setSelectedDay(null);
      setSelectedTime(null);
      setSelectedShow(null);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 crt-screen">
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="flex items-center">
          <motion.div whileHover={{ x: -5 }} className="text-crt-green mr-2">
            <ArrowLeft size={20} />
          </motion.div>
          <h1 className="font-retro text-crt-green text-sm">
            PROGRAM SCHEDULER
          </h1>
        </Link>
        <button
          onClick={() =>
            localStorage.setItem("tvSchedule", JSON.stringify(schedule))
          }
          className="text-crt-cyan hover:text-crt-green"
          title="Save Schedule"
        >
          <Save size={18} />
        </button>
      </div>

      <div className="relative mb-6">
        <h2 className="font-retro text-crt-cyan text-xs mb-2">
          AVAILABLE SHOWS
        </h2>
        <div className="relative overflow-hidden h-28">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${carouselIndex * 33.33}%)` }}
          >
            {carouselItems.map((item) => (
              <div key={item.id} className="min-w-[33.33%] px-1">
                <motion.div
                  whileHover={{ scale: 0.95 }}
                  className={`relative h-full rounded border-2 cursor-pointer overflow-hidden ${
                    selectedShow?.id === item.id
                      ? "border-crt-cyan"
                      : "border-crt-gray"
                  }`}
                  onClick={() =>
                    setSelectedShow({ title: item.title, id: item.id })
                  }
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <h3 className="font-retro text-xs text-center text-crt-green px-2">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 text-crt-green bg-black bg-opacity-70 p-1 rounded-full"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-crt-green bg-black bg-opacity-70 p-1 rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-crt-green border border-crt-green text-xs">
                TIME
              </th>
              {weekDays.map((day) => (
                <th
                  key={day}
                  className="p-2 text-crt-green border border-crt-green text-xs"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time}>
                <td className="p-2 text-crt-green border border-crt-green text-xs">
                  {time}
                </td>
                {weekDays.map((day) => {
                  const item = schedule.find(
                    (s) => s.day === day && s.time === time
                  );
                  const isSelected =
                    selectedDay === day && selectedTime === time;

                  return (
                    <td
                      key={`${day}-${time}`}
                      className={`border border-crt-green p-1 ${
                        isSelected ? "bg-crt-green bg-opacity-20" : ""
                      }`}
                      onClick={() => handleCellClick(day, time)}
                    >
                      {item && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-crt-cyan text-center text-[0.6rem] p-1 truncate"
                        >
                          {item.show}
                        </motion.div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDay && selectedTime && (
        <div className="mt-4 p-3 border border-crt-green bg-black bg-opacity-70">
          <div className="flex justify-between items-center mb-2">
            <div className="text-crt-green text-xs">
              {selectedDay} at {selectedTime}
            </div>
            <button
              onClick={removeFromSchedule}
              className="text-crt-red text-xs hover:underline"
            >
              Remove
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-crt-cyan text-xs">
              {selectedShow ? selectedShow.title : "Select a serie"}
            </div>

            <button
              onClick={addToSchedule}
              disabled={!selectedShow}
              className={`px-3 py-1 text-xs rounded ${
                selectedShow
                  ? "bg-crt-green text-black hover:bg-crt-cyan"
                  : "bg-crt-gray text-crt-gray-dark cursor-not-allowed"
              }`}
            >
              {selectedShow ? "Assign Serie" : "No Serie Selected"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;