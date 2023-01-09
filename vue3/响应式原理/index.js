const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)

export function reactive (target) {
  if (!isObject(target)) return target

  const handler = {
    get (target, key, receiver) {
      // 收集依赖
      track(target, key)
      const result = Reflect.get(target, key, receiver)
      return convert(result)
    },
    set (target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        trigger(target, key)
      }
      return result
    },
    deleteProperty (target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        // 触发更新
        trigger(target, key)
      }
      return result
    }
  }

  return new Proxy(target, handler)
}

let activeEffect = null
// 记录activeEffect栈，防止嵌套调用时activeEffect混乱，添加副作用时不正确
const activeEffectStack = []
const baseOptions = {scheduler,lazy:false}
export function effect (callback,options = {}) {
  options = Object.assign(baseOptions,options)
  function effectFn(){
    // 每次执行时，都清空callback已经存在的依赖副作用列表，防止分支切换导致的副作用遗留
    cleanup(effectFn)
    activeEffect = effectFn
    // effectFn入栈
    activeEffectStack.push(effectFn)
    const res = callback() // 访问响应式对象属性，去收集依赖
    // 这个时候effectFn已经成功添加了，从栈里移除
    activeEffectStack.pop()
    // 更新当前副作用函数
    activeEffect = activeEffectStack[activeEffectStack.length - 1]
    return res;
  }
  // deps用力啊存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = []
  effectFn.options = options
  // 第一次是否执行
  if(!options.lazy){
    effectFn()
  }
}

// 调度器
function scheduler(effect){
  jobQueue.add(effect)
  flushJob()
}
// 任务队列
const jobQueue = new Set()
// 是否正在刷新队列
let isFlushing = false
function flushJob(){
  if(isFlushing)return
  isFlushing = true
  Promise.resolve().then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => [
      isFlushing = false
  ])
}


function cleanup(effectFn){
  for(let i=0;i<effectFn.deps.length;i++){
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

let targetMap = new WeakMap()

export function track (target, key) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

export function trigger (target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  // 遍历使用新的set，防止cleanup删除副作用后，副作用执行时又添加了副作用，导致无限执行
  const depsToRun = new Set()
  if(dep){
    dep.forEach(effect => {
      // 避免无线递归调用
      if(effect !== activeEffect){
        depsToRun.add(effect)
      }
    })
  }
  depsToRun.forEach(effect => {
    // 调度执行副作用函数
    if(effect.options.scheduler){
      effect.options.scheduler(effect)
    }
  })
}

export function ref (raw) {
  // 判断 raw 是否是ref 创建的对象，如果是的话直接返回
  if (isObject(raw) && raw.__v_isRef) {
    return
  }
  let value = convert(raw)
  const r = {
    __v_isRef: true,
    get value () {
      track(r, 'value')
      return value
    },
    set value (newValue) {
      if (newValue !== value) {
        raw = newValue
        value = convert(raw)
        trigger(r, 'value')
      }
    }
  }
  return r
}

export function toRefs (proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}

  for (const key in proxy) {
    ret[key] = toProxyRef(proxy, key)
  }

  return ret
}

function toProxyRef (proxy, key) {
  const r = {
    __v_isRef: true,
    get value () {
      return proxy[key]
    },
    set value (newValue) {
      proxy[key] = newValue
    }
  }
  return r
}

export function computed (getter) {
  const result = ref()

  effect(() => (result.value = getter()))

  return result
}
