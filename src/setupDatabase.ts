import { Client } from 'pg';

export const setupDatabaseHandler = () => async (event, _context) => {
  const connectionString =
    '';
  const client = new Client({
    connectionString,
  });

  try {
    await client.connect();

    // Create the 'carts' and 'cart_items' tables
    await client.query(`
      CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');
      CREATE TABLE carts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL DEFAULT uuid_generate_v4(),
        created_at DATE NOT NULL DEFAULT current_date,
        updated_at DATE NOT NULL DEFAULT current_date,
        status cart_status
      );
      CREATE TABLE cart_items (
        cart_id UUID REFERENCES carts(id),
        product_id UUID DEFAULT uuid_generate_v4(),
        count INTEGER NOT NULL
      );
    `);

    // Insert test data
    await client.query(`
      INSERT INTO carts (user_id, status)
      VALUES (uuid_generate_v4(), 'OPEN');

      INSERT INTO cart_items (cart_id, product_id, count)
      VALUES ((SELECT id FROM carts WHERE status = 'OPEN' LIMIT 1), uuid_generate_v4(), 5);
    `);

    await client.end();
    console.log('Database tables created and test data inserted successfully.');
    return console.log('Setup completed successfully!');
  } catch (err) {
    console.log(`Error setting up database: ${err.message}`);
    await client.end();
    return console.log(err);
  }
}
