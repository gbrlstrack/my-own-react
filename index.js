function createNode(nodeName, attributes, ...args) {
    let children = args.length ? [].concat(...args) : null;
    return { nodeName, attributes, children }
}

function render(reactNode) {
    if (typeof reactNode === "string") return document.createTextNode(reactNode)
    if (typeof reactNode.nodeName === "function") {
        const componentVNode = reactNode.nodeName(reactNode.attributes || {});
        return render(componentVNode);
    }
    let node = document.createElement(reactNode.nodeName)

    let attributes = reactNode.attributes || {}
    Object.keys(attributes).forEach((key) => node.setAttribute(key, attributes[key]));

    (reactNode.children || []).forEach(children => node.appendChild(render(children)));

    return node
}

function MeuComponente(props) {
    return createNode('div', null, `Olá, ${props.nome}!`);
}

const root = document.getElementById('root');
var vdom = MeuComponente({ nome: "Gabs" })
var dom = render(vdom)

root.appendChild(dom);