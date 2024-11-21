// A file to get data from the fake BBDD

import sql from 'better-sqlite3';

const db = sql('meals.db');

// We simulate a delay
export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug); // This is to prevent sql injection
}
