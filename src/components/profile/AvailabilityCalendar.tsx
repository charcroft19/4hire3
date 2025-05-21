import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Clock } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  date: Date;
  timeSlots: TimeSlot[];
}

interface AvailabilityCalendarProps {
  availability: DayAvailability[];
  onAvailabilityChange: (availability: DayAvailability[]) => void;
  editable?: boolean;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  availability,
  onAvailabilityChange,
  editable = false
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTimeSlotForm, setShowTimeSlotForm] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState<TimeSlot>({
    start: '09:00',
    end: '17:00'
  });

  const getAvailabilityForDate = (date: Date) => {
    return availability.find(a => 
      a.date.toDateString() === date.toDateString()
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (editable) {
      setShowTimeSlotForm(true);
    }
  };

  const handleAddTimeSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    const existingAvailability = getAvailabilityForDate(selectedDate);
    if (existingAvailability) {
      onAvailabilityChange(
        availability.map(a =>
          a.date.toDateString() === selectedDate.toDateString()
            ? { ...a, timeSlots: [...a.timeSlots, newTimeSlot] }
            : a
        )
      );
    } else {
      onAvailabilityChange([
        ...availability,
        { date: selectedDate, timeSlots: [newTimeSlot] }
      ]);
    }

    setShowTimeSlotForm(false);
    setNewTimeSlot({ start: '09:00', end: '17:00' });
  };

  const tileContent = ({ date }: { date: Date }) => {
    const dayAvailability = getAvailabilityForDate(date);
    if (!dayAvailability) return null;

    return (
      <div className="text-xs text-blue-600 mt-1">
        {dayAvailability.timeSlots.length} slots
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Availability</h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <Calendar
            onChange={handleDateClick}
            value={selectedDate}
            tileContent={tileContent}
            className="w-full rounded-lg border border-gray-200 p-4"
          />
        </div>
        
        <div className="flex-1">
          {selectedDate && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-4">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </h4>
              
              {showTimeSlotForm && editable ? (
                <form onSubmit={handleAddTimeSlot} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={newTimeSlot.start}
                        onChange={(e) => setNewTimeSlot({ ...newTimeSlot, start: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={newTimeSlot.end}
                        onChange={(e) => setNewTimeSlot({ ...newTimeSlot, end: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowTimeSlotForm(false)}
                      className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Add Time Slot
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  {getAvailabilityForDate(selectedDate)?.timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-white p-3 rounded-md border border-gray-200"
                    >
                      <Clock size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-900">
                        {slot.start} - {slot.end}
                      </span>
                    </div>
                  ))}
                  
                  {(!getAvailabilityForDate(selectedDate) || 
                    getAvailabilityForDate(selectedDate)?.timeSlots.length === 0) && (
                    <p className="text-gray-500 text-sm">
                      No availability set for this date
                    </p>
                  )}
                  
                  {editable && !showTimeSlotForm && (
                    <button
                      onClick={() => setShowTimeSlotForm(true)}
                      className="mt-4 w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                    >
                      Add Time Slot
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;