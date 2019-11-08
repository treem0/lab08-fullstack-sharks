import Component from '../Component.js';
import Header from '../common/Header.js';
import SharkForm from '../shark-form/SharkForm.js';
import { getDangerLevel } from '../services/shark-api.js';

class SharkFormApp extends Component {

    onRender(dom) {
        const header = new Header({ title: 'Add a Shark' });
        dom.prepend(header.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <main>
                    <p>Shark Form Page</p>
                </main>
            </div>
        `;
    }
}

export default SharkFormApp;