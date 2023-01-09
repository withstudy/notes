function createNode(){
    return {
        value: getRandom(),
        left: null,
        right: null
    }
}

function getRandom(){
    return Math.floor(Math.random() * 100)
}

function getNodes(n){
    if(n <= 0) return null
    const root = createNode()
    root.value = getRandom()
    root.left = getNodes(n-1)
    root.right = getNodes(n-1)
    return root
}
module.exports = getNodes
