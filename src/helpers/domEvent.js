export default (selector, eventType) => {
  const elements = [...document.querySelectorAll(selector)];
  const event = new CustomEvent(eventType);

  elements.map(elmt => (elmt.dispatchEvent(event)));
};
