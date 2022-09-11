import Block from "../../utils/Block";
import template from "./avatar.hbs";

interface AvatarProps {
    className?:string;
    style?: Record<string, string>;
    withoutWrapper?: boolean;
    path?:string;
    url?:string;
    label?:string;
    width?: string|number;
    height?: string|number;
    events ?: {}
}

export default class Avatar extends Block<AvatarProps>{
    constructor(props: AvatarProps) {
        super('div', {...props, withoutWrapper: props.withoutWrapper || true});
        if (this.element && this.element instanceof HTMLElement){
            try {
                if (Array.isArray(props.className))
                    this.element.classList.add('avatar', [...props.className].join(', '));
                else if (props.className)
                    this.element.classList.add('avatar', ...props.className.split(' ').map(el => `${el}`));
                else
                    this.element.classList.add('avatar');
                if (props.style)
                    Object.entries(props.style).forEach(([key, value]: [any, string]) => this.element!.style[key] = value)
                if (props.path)
                {
                    //TODO: change meta url
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