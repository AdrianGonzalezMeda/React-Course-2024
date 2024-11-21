'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

// Server actions can be use only in server mode, and allows to use in the action form prop

function isInvalidText(text) {
    return !text || text.trim() === ''
}

// When use useFormState, the function recives 2 params, 1 has the state declared in useFormState
// otherwise using the function without this hook in the action <form> prop only recives formData
export async function shareMeal(prevState, formData) { // this function only executes in server mode and must be async
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    }

    if (isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image ||
        meal.image.size === 0
    ) {
        return {
            message: 'Invalid input'
        };

    }

    await saveMeal(meal);
    redirect('/meals');
}
