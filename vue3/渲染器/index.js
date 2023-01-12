import {ref} from '../../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'

const renderApi = {
    insert(el,parent){
        parent.appendChild(el)
    },
    setElementText(el,text){
        el.textContent = text
    },
    createElement(type){
        return document.createElement(type)
    },
    removeElement(el,parent){
        document.removeElement(el,parent)
    }
}

export function createRenderer({insert,setElementText,createElement,removeElement} = renderApi){
    function render(vnode,container){
        if(vnode){
            patch(container._vnode,vnode,container)
        }
        container._vnode = vnode
    }

    function patch(oldVnode,newVnode,container){
        if(!oldVnode){
            mountElement(newVnode,container)
        }else{
            patchElement(oldVnode,newVnode,container)
        }
    }

    function patchElement(oldVnode,newVnode,container){
        const {type: oldType} = oldVnode
        const {type: newType} = newVnode
        if(oldType !== newType){
            unmountElement(oldVnode._el,container)
            mountElement(newVnode,container)
        }
        patchProps(oldVnode.props,newVnode.props,oldVnode._el)
    }

    function patchProps(oldProps,newProps,el){
        oldProps = oldProps || {}
        newProps = newProps || {}
        for(let oldkey in oldProps){
            if(oldkey in newProps){
                if(oldProps[oldkey] !== newProps[oldkey]){
                    setAttribute(oldkey,newProps[oldkey],el)
                }
            }else{
                removeAttribute(oldkey,oldProps[oldkey],el)
            }
        }
        for(let newkey in newProps){
            if(!(newProps in oldProps)){
                setAttribute(newkey,newProps[newkey],el)
            }
        }
    }

    function mountElement(vnode,container) {
        const { type,children,props } = vnode
        const el = createElement(type)
        if(children){
            if(Array.isArray(children)){
                children.forEach(child => {
                    patch(null,child,el)
                })
            }else if(typeof children === 'string'){
                setElementText(el,children)
            }
        }

        if(props){
            for(let key in props){
                const value = props[key]
                setAttribute(key,value,el)
            }
        }

        insert(el,container)
        vnode._el = el
    }

    function unmountElement(el,container){
        removeElement(el,container)
    }

    return {
        render
    }
}

function setAttribute(key,value,el){
    if(key in el){
        if(typeof value === 'boolean' && value === ''){
            if(value === ''){
                el[key] = false
            }else{
                el[key] = true
            }
        }else{
            el[key] = value
        }
    } else {
        el.setAttribute(key,value)
    }
}

function removeAttribute(key,value,el){
    if(key in el){
        if(typeof value === 'boolean'){
            el[key] = null
        }
    } else {
        el.setAttribute(key,null)
    }
}
