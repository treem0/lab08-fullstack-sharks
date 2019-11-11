import Component from '../Component.js';

class SharkDetail extends Component {
    renderHTML() {
        const shark = this.props.shark;
        const json = JSON.stringify(shark, true, 4);
        return /*html*/`
        <pre>${json}</pre>
        `;
    }
}

export default SharkDetail;