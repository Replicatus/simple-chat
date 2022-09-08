import Block from "../../utils/Block";
import template from "./avatar.hbs";

interface AvatarProps {
    className?:string;
    style?: string;
    withoutWrapper?: boolean;
    path?:string;
    url?:string;
    width?: string|number;
    height?: string|number;
    events ?: {}
}

export default class Avatar extends Block{
    constructor(props: AvatarProps) {
        super('div', {...props, withoutWrapper: props.withoutWrapper !== undefined ? props.withoutWrapper : true});
        if (this.element && this.element instanceof HTMLElement){
            try {
                if (Array.isArray(props.className))
                    this.element.classList.add('avatar', [...props.className].join(', '));
                else if (props.className)
                    this.element.classList.add('avatar', ...props.className.split(' ').map(el => `${el}`));
                else
                    this.element.classList.add('avatar');
                if (props.style)
                    this.element.setAttribute('style' , props.style);
                if (props.path)
                {
                    // @ts-ignore
                    const baseUrl: string = import.meta.url.slice(0, import.meta.url.indexOf('///') + 3);
                    // console.log(import.meta.url, baseUrl);
                       // .findIndex('///')
                    const imageUrl = new URL(
                        props.path,
                        // @ts-ignore
                        import.meta.url
                    );
                    this.element.style.backgroundImage = `url(${props.url? props.url :  imageUrl})`;
                }
                if (props.width)
                    this.element.style.width = props.width+'px';
                if (props.height)
                    this.element.style.height = props.height+'px';
            }catch (e) {
                console.error(e)
            }
        }
    }
    render() {
        return this.compile(template, this.props)
    }
}