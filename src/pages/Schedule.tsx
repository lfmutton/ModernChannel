import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for carousel banners
const carouselItems = [
  { id: 1, title: "CYBER NEXUS", image: "https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 2, title: "RETRO WAVES", image: "https://images.pexels.com/photos/3265460/pexels-photo-3265460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 3, title: "NEON NIGHTS", image: "https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 4, title: "SYNTHWAVE", image: "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 5, title: "DIGITAL DREAMS", image: "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 6, title: "PIXEL PERFECT", image: "https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 7, title: "VECTOR VOYAGE", image: "https://images.pexels.com/photos/2510067/pexels-photo-2510067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 8, title: "BIT CRUSHED", image: "https://images.pexels.com/photos/3056059/pexels-photo-3056059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 9, title: "GLITCH ART", image: "https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { id: 10, title: "8-BIT WONDERS", image: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];

// Mock data for schedule
const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const timeSlots = ['8:00', '12:00', '16:00', '20:00', '00:00'];

interface ScheduleItem {
  day: string;
  time: string;
  show: string;
}

const Schedule: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { day: 'MON', time: '20:00', show: 'NEON NIGHTS' },
    { day: 'WED', time: '16:00', show: 'CYBER NEXUS' },
    { day: 'FRI', time: '00:00', show: 'SYNTHWAVE' },
    { day: 'SAT', time: '20:00', show: 'RETRO WAVES' },
  ]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedShow, setSelectedShow] = useState<string | null>(null);

  const nextSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % (carouselItems.length - 2));
  };

  const prevSlide = () => {
    setCarouselIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 3 : prevIndex - 1
    );
  };

  const handleCellClick = (day: string, time: string) => {
    setSelectedDay(day);
    setSelectedTime(time);
    
    const existingSchedule = schedule.find(item => item.day === day && item.time === time);
    setSelectedShow(existingSchedule ? existingSchedule.show : null);
  };

  const addToSchedule = () => {
    if (selectedDay && selectedTime && selectedShow) {
      const filteredSchedule = schedule.filter(
        item => !(item.day === selectedDay && item.time === selectedTime)
      );
      
      setSchedule([
        ...filteredSchedule,
        { day: selectedDay, time: selectedTime, show: selectedShow }
      ]);
      
      setSelectedDay(null);
      setSelectedTime(null);
      setSelectedShow(null);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
      {/* Header with back button */}
      <div className="flex items-center mb-4">
        <Link to="/">
          <motion.div whileHover={{ x: -5 }} className="text-crt-green mr-4">
            <ArrowLeft size={20} />
          </motion.div>
        </Link>
        <h1 className="font-retro text-crt-green text-sm">PROGRAM SCHEDULER</h1>
      </div>

      {/* Carousel */}
      <div className="relative mb-6">
        <h2 className="font-retro text-crt-cyan text-xs mb-2">AVAILABLE SHOWS:</h2>
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${carouselIndex * 33.33}%)` }}
          >
            {carouselItems.map((item) => (
              <div 
                key={item.id}
                className="min-w-[33.33%] px-2"
                onClick={() => setSelectedShow(item.title)}
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`
                    relative h-24 overflow-hidden rounded border-2 cursor-pointer
                    ${selectedShow === item.title ? 'border-crt-cyan animate-glow' : 'border-crt-gray'}
                  `}
                >
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-retro text-xs text-center text-white">{item.title}</h3>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-crt-green z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-crt-green z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Weekly Agenda */}
      <h2 className="font-retro text-crt-cyan text-xs mb-2">WEEKLY SCHEDULE:</h2>
      <div className="flex-1 overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="p-2 text-crt-green border-2 border-crt-green"></th>
              {weekDays.map(day => (
                <th key={day} className="p-2 text-crt-green border-2 border-crt-green">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(time => (
              <tr key={time}>
                <td className="p-2 text-crt-green border-2 border-crt-green">{time}</td>
                {weekDays.map(day => {
                  const scheduleItem = schedule.find(item => item.day === day && item.time === time);
                  const isSelected = selectedDay === day && selectedTime === time;
                  
                  return (
                    <td 
                      key={`${day}-${time}`}
                      className={`p-2 border-2 border-crt-green relative cursor-pointer ${
                        isSelected ? 'bg-crt-green bg-opacity-20' : ''
                      }`}
                      onClick={() => handleCellClick(day, time)}
                    >
                      {scheduleItem ? (
                        <div className="text-crt-cyan text-center text-[0.6rem]">
                          {scheduleItem.show}
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selection controls */}
      {selectedDay && selectedTime && (
        <div className="mt-4 p-2 border-2 border-crt-green">
          <p className="text-crt-green text-xs mb-2">
            Selected: {selectedDay} at {selectedTime}
          </p>
          <div className="flex justify-between items-center">
            <div className="text-crt-cyan text-xs">
              {selectedShow || "Select a show from above"}
            </div>
            <button 
              onClick={addToSchedule}
              disabled={!selectedShow}
              className={`crt-button text-xs py-1 px-2 ${!selectedShow ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              ADD TO SCHEDULE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;