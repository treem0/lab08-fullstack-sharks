import Component from '../Component.js';
import { addShark } from '../services/shark-api.js';

class SharkForm extends Component {

    onRender(form) {
        const dangerRange = form.querySelector('1234');
        const dangerDisplay = form.querySelector('12345');
        const syncDanger = () => dangerDisplay.textContent = dangerRange.value;
        dangerRange.addEventListener('input', syncDanger);
        syncDanger(); 
        
        form.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(form);

            const shark = {
                name: formData.get('name'),
                dangerLevel: parseInt(formData.get('dangerlevel-id')),
                url: formData.get('url'),
                killer: formData.get('is-killer') === 'on'
            };

            try {
                const saved = await addShark(shark);

                window.location = 'shark-list.html';
            }
            catch (err) {
                console.log('shark not saved :(', err);
            }

        });
    }
    renderHTML() {
        const dangerLevel = this.props.dangerlevel; //CHECK ON THIS
        const optionsList = dangerLevel.map(danger => {
            return `<option value="${danger.id}">${danger.dangerous}</option>`;
        });

        const joinedOptionList = optionsList.join('');

        return /*html*/`
            <form class="shark-form">
                <p>
                    <label for="name">Name</label>
                    <input id="name" name="name" required placeholder="Great White">
                </p>
                <p>
                    <label for="danger">Danger Level</label>
                    <select id="dangerous" name="dangerlevel-id" required>
                    <option disabled selected>&lt;select a type&gt;</option>
                                ${joinedOptionList}
                            </select>
                </p>
                <p>
                    <label for="url">Image Url</label>
                    <input id="url" name="url" required placeholder="./public/assets/great-white.jpg">
                </p>
                <fieldset for="is-killer">
                    <legend>Is It A Human Killer?</legend>
                    <label class="horizontally-centered">
                    <input id="is-killer" name="is-killer" type="checkbox"> Yes
                    </label>
                </fieldset>
                <p>
                    <button>Add This Shark</button>
                    </p>
            </form>
        `;
    }
}

export default SharkForm;