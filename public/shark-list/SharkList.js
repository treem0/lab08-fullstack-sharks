import Component from '../Component.js';
import SharkItem from './SharkItem.js';

class SharkList extends Component {

    onRender(dom) {
        const sharks = this.props.sharks;

        sharks.forEach(shark => {
            const props = { shark: shark };
            const sharkItem = new SharkItem(props);
            const SharkItemDOM = sharkItem.renderDOM();
            dom.appendChild(SharkItemDOM);
        });
    }

    renderHTML(){
        return /*html*/`
        <ul class="sharks"></ul>
        `;
    }
}

export default SharkList;

