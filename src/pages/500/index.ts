import Block from "../../utils/Block";
import {Link} from "../../components/link";


export class Page500 extends Block{
    constructor() {
        super('section', {class: 'error-page'});
    }
    render(): string {
        const link = new Link({
            label: "Назад к чатам",
            href: "/"
        });
        return `
<section class="error-page">
<div>
        <div class="error-page__title">500 </div>
        <div class="error-page__subtitle">Мы уже фиксим</div>
        ${(link.render())}
    </div>
</section>`
    }
}