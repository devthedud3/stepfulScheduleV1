import { pool } from "@/db";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE iscoach = true ORDER BY id;"
    );
    const users = result.rows;
    return NextResponse.json({ users });
  } catch (err) {
    return NextResponse.json(
      { message: "Error GET: api/users", err: err.message },
      { status: 500 }
    );
  }
};

export const POST = async (req, res) => {
  const { firstname, lastname } = await req.json();
  try {
    await pool.query(
      `
      INSERT INTO users (firstName, lastName, isCoach, schedule)
      VALUES ($1, $2, true, '[]'); 
      `,
      [firstname, lastname]
    );

    return NextResponse.json({
      message: `User ${firstname} ${lastname} added!`
    });
  } catch (err) {
    return NextResponse.json({ err: err.message });
  }
};

export const PUT = async (req, res) => {
  const { id, schedule } = await req.json();

  try {
    await pool.query(
      `
        UPDATE users
        SET schedule = $1 
        WHERE id = $2
      `,
      [JSON.stringify(schedule), id]
    );
    return NextResponse.json({ message: `USER ${id} updated` });
  } catch (err) {
    return NextResponse.json({ err: err.message });
  }
};
