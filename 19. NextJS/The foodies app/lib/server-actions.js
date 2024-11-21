'use server';
// Server actions can be use only in server mode, and allows to use in the action form prop

async function shareMeal(formData) { // this function only executes in server mode and must be async
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    }

    console.log(meal)
}
