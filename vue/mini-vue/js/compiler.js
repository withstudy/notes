class Compiler{
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compiler(this.el)
    }

    compiler(el){
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if(this.isTextNode(node)){
                this.compilerText(node)
            }else if (this.isElementNode(node)){
                this.compilerElement(node)
            }

            if(node.childNodes && node.childNodes.length){
                this.compiler(node)
            }
        })

    }

    compilerElement(node){
        Array.from(node.attributes).forEach(attr => {
            let attrName = attr.name
            if(this.isDirective(attrName)){
                //属性名称 text model
                attrName = attr.name.substr(2)
                //属性值 变量属性
                const key = attr.value
                this.update(node,key,attrName)
            }
        })
    }

    update(node,key,attrName){
        const updater = this[attrName + 'Updater']
        updater && updater.call(this,node,key,this.vm[key])
    }

    textUpdater(node,key,value){
        node.textContent = value

        new Watcher(this.vm,key,newVal => {
            node.textContent = newVal
        })
    }

    modelUpdater(node,key,value){
        node.value = value

        new Watcher(this.vm,key,newVal => {
            node.value = newVal
        })

        node.addEventListener('input',() => {
            this.vm[key] = node.value
        })
    }

    compilerText(node){
        const reg = /\{\{(.+?)\}\}/
        const value = node.textContent
        if(reg.test(value)){
            const key = RegExp.$1.trim()
            node.textContent = value.replace(reg,this.vm[key])

            new Watcher(this.vm,key,newVal => {
                node.textContent = newVal
            })
        }
    }

    isDirective(attrName){
        return attrName.startsWith('v-')
    }

    isTextNode(node){
        return node.nodeType === 3
    }

    isElementNode(node){
        return node.nodeType === 1
    }
}
