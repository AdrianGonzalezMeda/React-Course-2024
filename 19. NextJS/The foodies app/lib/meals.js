// A file to get data from the fake BBDD

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

// We simulate a delay
export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug); // This is to prevent sql injection
}

export function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lowe: true });
    meal.instructions = xss(meal.instructions); // To sanitize the input, because we use in a dangerouslySetInnerHTML div. Saving from scripting injection
    

}
