// import FullCalendar from "@fullcalendar/react";
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import { useRef } from "react";

// const Calendar = () => {
//   const calendarRef = useRef(null);
//   return (
//     <FullCalendar
//       // innerRef={calendarRef}
//       plugins={[timeGridPlugin, interactionPlugin]}
//       editable
//       selectable
//     />
//   );
// };

// export default Calendar;
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

export default function Calendar() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const start = new Date();
  const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
  const employees = [
    {
      name: "Charlie",
      id: "u224",
      email: "fj@jf",
      backgroundColor: "green",
    },
    {
      name: "Neptaly",
      id: "u225",
      email: "fj@jf",
      backgroundColor: "red",
    },
    {
      name: "Victor",
      id: "u226",
      email: "fj@jf",
      backgroundColor: "orange",
    },
    {
      name: "Salvador",
      id: "u227",
      email: "fj@jf",
      backgroundColor: "yellow",
    },
  ];
  const data = [
    {
      title: "sala 1",
      start,
      end,
      backgroundColor: "green",
      extendedProps: { id: 1 },
    },
  ];

  const [events, setEvents] = useState(data);
  const [selected, setSelected] = useState<any>();
  const calendarRef = useRef(null);
  const user = employees.find((user) => user.id == selected);
  // console.log(employees.find(user=>user.id==selected))
  // console.log(events.getEventById())
  console.log(events);
  console.log(selected);
  return (
    <div style={{ padding: 20 }}>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <select onChange={(e) => setSelected(e.target.value)}>
                    <option value="" selected disabled hidden >Select</option>
                    {employees.map((user) => {
                      return (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <FullCalendar
        editable={true}
        eventDragStop={(info: any) => console.log(info.event, "🛑")}
        nowIndicator={true}
        eventClick={(info: any) =>
          console.log(info.event.extendedProps, info.event.title)
        }
        // editable={selected!= undefined? true:false}
        views={{
          dayGrid: {
            selectable: true,
          },
          timeGrid: {
            selectable: true,
          },
          dayGridMonth: {
            selectable: false,
          },
        }}
        businessHours={
          [ // specify an array instead

          {
            daysOfWeek: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
            startTime: '08:00', // 8am
            endTime: '18:00' // 6pm
          },
          {
            daysOfWeek: [ 4, 5 ], // Thursday, Friday
            startTime: '10:00', // 10am
            endTime: '16:00' // 4pm
          }
        ]
        } 
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        eventDrop={(info: any) => {
          const eventFiltered = events.filter(
            (event) => event.extendedProps.id !== info.event.extendedProps.id
          ) as any;
          setEvents([
            ...eventFiltered,
            {
              title: info.event.title,
              start: info.event.startStr,
              end: info.event.endStr,
              id: user?.id,
              backgroundColor: info.event.backgroundColor,
              extendedProps: { id: info.event.extendedProps.id },
            },
          ]);
          console.log("Dropped " + info.event.title);
        }}
        eventResize={(info: any) => {
          console.log(selected);
          const eventFiltered = events.filter(
            (event) => event.extendedProps.id !== info.event.extendedProps.id
          ) as any;
          setEvents([
            ...eventFiltered,
            {
              title: info.event.title,
              start: info.event.startStr,
              end: info.event.endStr,
              id: user?.id,
              backgroundColor: user?.backgroundColor,
              extendedProps: { id: info.event.extendedProps.id },
            },
          ]);
          alert("Resized " + info.event.title);
        }}
        select={(info: any) => {
          // @ts-ignore
          console.log(info);
          if (selected != undefined) {
            setEvents((event) => {
              const newId = events[events.length - 1].extendedProps.id + 1;
              return [
                ...event,
                {
                  title: `sala ${newId}`,
                  start: info.startStr,
                  end: info.endStr,
                  id: user?.id,
                  backgroundColor: user?.backgroundColor || "green",
                  extendedProps: { id: newId },
                },
              ];
            });
            console.log("selected " + info.startStr + " to " + info.endStr);
          }
        }}
        events={events}
        timeZone={"UTF"}
        titleFormat={{ year: "numeric", month: "long" }}
        allDaySlot={false}
        buttonText={{
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          right: "prevYear,prev,next,nextYear",
        }}
      />
    </div>
  );
}
