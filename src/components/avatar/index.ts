import Block from "../../utils/Block";
import template from "./avatar.hbs";

interface AvatarProps {
    classes?:string[];
    style?: Record<string, string>;
    withoutWrapper?: boolean;
    path?:string;
    url?:string;
    label?:string;
    width?: string|number;
    height?: string|number;
    events ?: {},
    componentDidUpdate: Function
}

export default class Avatar extends Block<AvatarProps>{
    constructor(props: AvatarProps) {
        super('div', {...props, withoutWrapper: props.withoutWrapper || true});
        if (this.element && this.element instanceof HTMLElement){
            try {
                if (Array.isArray(props.classes))
                    this.element.classList.add('avatar', ...props.classes);
                else
                    this.element.classList.add('avatar');
                if (props.style)
                    Object.entries(props.style).forEach(([key, value]: [any, string]) => this.element!.style[key] = value)
                if (props.path || props.url)
                {
                    //TODO: change meta url
                    const defaultPath = `https://ya-praktikum.tech/api/v2/resources/`
                    let imageUrl;
                    if (props.path)
                        imageUrl = defaultPath + props.path;
                    console.log('!', imageUrl)
                    this.element.style.backgroundImage = `url(${props.path? imageUrl :  props.url})`;
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
    componentDidUpdate(oldProps: AvatarProps, newProps: AvatarProps): boolean  {
        return true
    }

    render() {
        console.log('this.props.path', this.props.path)
        return this.compile(template, this.props)
    }
}