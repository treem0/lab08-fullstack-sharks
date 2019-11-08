import Component from '../Component.js';

class SharkItem extends Component {
    renderHTML() {
        const shark = this.props.shark;
        return /*html*/`
        <li class="shark-item">
            <div class="name-container">
                <h2>${shark.name}</h2>
            </div>
            <div class="image-container">
                <img src="${shark.url}" alt="${shark.name} image">
            </div>
            <div class="info-container">
            <p class="fatality">${shark.killer}</p>
            <p class="dangerous">${shark.dangerLevel}</p>
            </div>
        </li>
    `;
    }
}

export default SharkItem;