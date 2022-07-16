
let list = [];
document.querySelectorAll(`div[data-testid^="solid-message-bubble"]`).forEach(
    (i) => list.push(i)
);

const text = list.map((val) => val.children[0].children[0]);
