import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import './Calender1.css';
import supabase from '../../../supabase';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
      
        const { data, error } = await supabase
          .from('ORG_ORIENTED_CAMPAIGN')
          .select('*');

        if (error) {
          throw error;
        }

       
        const formattedEvents = data.map((event) => ({
          title: event.description,
          start: new Date(event.date),
          end: new Date(event.date),
          column1: event.orgName,
          column2: event.venue,
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events from Supabase:', error);
      }
    };

    fetchEvents();
  }, []); 

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '20px' }}
      />
    </div>
  );
};

export default MyCalendar;
