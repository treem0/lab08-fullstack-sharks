const URL = '/api';

export async function getSharks() {  
    const url = `${URL}/sharks`;

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

