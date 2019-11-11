const URL = '/api';

export async function getSharks() {  
    const url = `${URL}/sharks`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function getShark(id) {
    const url = `${URL}/sharks/${id}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function getDangerLevel() {
    const url = `${URL}/dangerlevel`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function addShark(shark) {
    const url = `${URL}/sharks`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shark)
    });

    const data = await response.json();
    return data;
}
