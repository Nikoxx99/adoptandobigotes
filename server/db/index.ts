import { createPool } from 'mysql2/promise';
const config = useRuntimeConfig()

interface Options {
  query: string;
  values?: any[];
}

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: config.dbpassword,
  database: 'censo_bigotes',
});

export const sql = async ({ query, values }: Options) => {
  const [rows] = await pool.query(query, values);
  return rows;
};