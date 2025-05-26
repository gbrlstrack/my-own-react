function createNode(nodeName, attributes, ...args) {
    let children = args.length ? [].concat(...args) : null;
    return { nodeName, attributes, children }
}

function render(reactNode) {
    if (typeof reactNode === "string") return document.createTextNode(reactNode)

    let node = document.createElement(reactNode.nodeName)

    let attributes = reactNode.attributes || {}
    Object.keys(attributes).forEach((key) => node.setAttribute(key, attributes[key]));

    (reactNode.children || []).forEach(children => node.appendChild(render(children)));

    return node
}

var test = createNode('div', { id: "foo" }, 'Hello!');
var component = render(test)
const root = document.getElementById('root');
root.appendChild(component);