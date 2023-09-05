"use client";
import { useEffect, useState } from "react";

import { Calendar } from "./components/calender/Calendar.component";

import styles from "./page.module.css";
import { Form } from "./components/form/Form.component";

export default function Home() {
  const [data, setData] = useState([]);
  const [showNewCoachForm, setShowForm] = useState(false);
  const [user, setUser] = useState({
    selected: "1",
    selectedCoach: "0",
    selectedDate: ""
  });

  const getData = async () => {
    const res = await fetch("/api/users");
    const { users } = await res.json();
    setData(users);
  };

  const userData = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const setSelectedDate = (e) => {
    setUser({ ...user, selectedDate: e });
  };

  const setCoachAvailability = async (e) => {
    e.preventDefault();
    if (!user.selectedDate) {
      return;
    }

    data[user.selectedCoach]?.schedule.push(user.selectedDate);

    try {
      await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data[user.selectedCoach])
      });
    } catch (err) {
      console.log("Check Page::handleSubmit");
    }
  };

  const handleShowForm = () => {
    setShowForm(!showNewCoachForm);
  };

  useEffect(async () => {
    getData();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.headlineText}>Meeting scheduler</h1>
      </section>
      <h3 className={styles.label}>Select your account type</h3>
      <section className={styles.section}>
        <select className={styles.options} name="selected" onChange={userData}>
          <option value="0">Student</option>
          <option value="1">Coach</option>
        </select>
      </section>
      {user.selected === "0" ? (
        <>
          <section>
            <h3 className={styles.label}>Select a coach to meet with</h3>
            {data.map((e, idx) => {
              const i = idx.toString();
              return (
                <div className={styles.radioContainer}>
                  <input
                    className={styles.selection}
                    type="radio"
                    value={i}
                    name="selectedCoach"
                    onChange={userData}
                    checked={user.selectedCoach === i}
                  />
                  <p>
                    Mr. {e.firstname} {e.lastname}
                  </p>{" "}
                </div>
              );
            })}
          </section>
          <div className={styles.scheduleContainer}>
            <section className={styles.calender}>
              <h3 className={styles.label}>Availability</h3>
              <Calendar
                handleClick={setSelectedDate}
                value={user.selectedDate}
              />
            </section>
            <section className={styles.schedule}>
              <h3 className={styles.label}>Time slots</h3>
              <div></div>
            </section>
          </div>
          <button
            className={styles.btn}
            type="button"
            onClick={setCoachAvailability}
          >
            Book Appointment
          </button>
        </>
      ) : (
        <>
          <section>
            <h3 className={styles.label}>Select your name from the menu</h3>

            {data.map((e, idx) => {
              const i = idx.toString();
              return (
                <div className={styles.radioContainer}>
                  <input
                    className={styles.selection}
                    type="radio"
                    value={i}
                    name="selectedCoach"
                    onChange={userData}
                    checked={user.selectedCoach === i}
                  />
                  <p>
                    {e.firstname} {e.lastname}
                  </p>{" "}
                </div>
              );
            })}
            <div className={styles.radioContainer}>
              <button onClick={handleShowForm}>+</button>
              <p>Add new coach</p>
            </div>
          </section>
          {showNewCoachForm && (
            <section className={styles.calender}>
              <Form />
            </section>
          )}
        </>
      )}
    </main>
  );
}
