import React, { useState } from "react";
import styles from "./form.module.css";

export const Form = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((form.firstname == "") | (form.lastname == "")) {
      return;
    }
    try {
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
    } catch (err) {
      console.log("Check NewCoach::handleSubmit");
    }
    window.location.reload();
  };

  return (
    <div>
      <h4 className={styles.container}>Create New Coach</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstname"
            className={styles.input}
            placeholder="First name"
            value={form.firstname}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="lastname"
            className={styles.input}
            placeholder="Last name"
            value={form.lastname}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className={styles.btn} type="submit">
            Create new coach
          </button>
        </div>
      </form>
    </div>
  );
};
