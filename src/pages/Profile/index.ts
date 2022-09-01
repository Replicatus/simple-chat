import Block from "../../utils/Block";
import {Button} from "../../components/button";
import {Input} from "../../components/input";

import  template from "./Profile.hbs"



export class Profile extends Block{
    constructor(props: {}) {
        super('section', {...props});
    }
    init() {

    if (this.props.fields && Array.isArray(this.props.fields)) {
            this.children.inputs = this.props.fields.map((el, index) => {
                return new Input({
                        ...el,
                        events: {
                            click: () => console.log('clicked on :', 'input' + index),
                        },
                    })
            });

        }
        // if (this.props.fields && Array.isArray(this.props.fields))
        //     this.props.fields.forEach((el, index) =>{
        //         this.children['input'+index] = new Input({
        //             ...el,
        //             events: {
        //                 click: () => console.log('clicked on :', 'input'+index),
        //             },
        //         })
        //     });
        [
            {name: 'buttonChange', className: 'text', label: 'Изменить данные', events: {click: () => console.log('clicked on buttonChange'),}},
            {name: 'buttonChangePassword', className: 'text', label: 'Изменить пароль', events: {click: () => console.log('clicked on buttonChangePassword'),}},
            {name: 'buttonExit', className: 'text error', label: 'Выйти', events: {click: () => console.log('clicked on buttonExit'),}},
        ].forEach(el => {
            this.children[el.name] = new Button({
                className: el.className,
                label: el.label,
                events: el.events,
                replaceNode: true
            });
        });

        super.init();
    }

    render() {
        this.element!.classList.add('profile-page')
        return this.compile(template, this.props)
    }
}